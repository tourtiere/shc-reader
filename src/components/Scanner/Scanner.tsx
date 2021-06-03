import { h } from "preact";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { ScanContext } from "providers/scan";
import QrScanner from "qr-scanner"; // if installed via package and bundling with a module bundler like webpack or rollup
import "./Scanner.scss";
import { Buffer } from "buffer";
import SHC from "types/SHC";
const pako = require("pako");

const extractCode = (qr: string) => {
    const match = qr.match(/[0-9]{2}/g);
    if (match === null) return;
    const token = match
        .map((n) => Number(n))
        .map((n) => String.fromCharCode(n + 45))
        .join("");
    const payload = token.split(".")[1];
    const buff = Buffer.from(payload, "base64");
    const json = pako.inflateRaw(buff, { to: "string" });
    return JSON.parse(json) as SHC;
};

interface Props {}
export default (props: Props) => {
    //const scannerRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setPayload } = useContext(ScanContext);
    const [error, setError] = useState("");

    useEffect(() => {
        // Maybe later:
        /*

        const scanner = new QrScanner(
            scannerRef.current,
            (result) => {
                try {
                    const shc = extractCode(result);
                    if (shc) setPayload(shc);
                    //console.log(shc);
                } catch {
                    //console.log("error");
                }
            },
            undefined,
            undefined,
            "environment"
        );
        scanner.start();
        */

        fileInputRef.current.addEventListener(
            "change",
            (onchange = (e: Event) => {
                const files = fileInputRef.current.files;
                if (files === null) return;
                const file = files.item(0);
                if (file === null) return;

                //return;
                QrScanner.scanImage(file, {})

                    .then((result) => {
                        const shc = extractCode(result);
                        if (shc) setPayload(shc);
                    })
                    .catch((reason) => setError(reason));
            })
        );
    }, []);

    return (
        <div className={"scanner-wrapper"}>
            <p>{error}</p>
            <div>
                <input type="file" ref={fileInputRef} />
            </div>
        </div>
    );

    //<video ref={scannerRef} />
};
