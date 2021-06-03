import { h } from "preact";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { ScanContext } from "providers/scan";
import QrScanner from "qr-scanner"; // if installed via package and bundling with a module bundler like webpack or rollup

import imageCompression from "browser-image-compression";
import "static/loading.gif";
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
    const scannerRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setPayload } = useContext(ScanContext);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Maybe for later:

        /*
        try {
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
        } catch {}
        */

        fileInputRef.current.addEventListener(
            "change",
            (onchange = (e: Event) => {
                const files = fileInputRef.current.files;
                if (files === null) return;
                const heavyFile = files.item(0);
                if (heavyFile === null) return;
                setIsLoading(true);

                imageCompression(heavyFile, { maxSizeMB: 0.1 })
                    .then((file) =>
                        QrScanner.scanImage(file, {}, undefined, undefined)
                            .then((result) => {
                                const shc = extractCode(result);
                                if (shc) setPayload(shc);
                            })
                            .catch((reason) => {
                                debugger;

                                setError(reason);
                            })
                    )
                    .finally(() => setIsLoading(false));
            })
        );
    }, []);

    return (
        <div className={"scanner-wrapper"}>
            <div>
                <input type="file" ref={fileInputRef} />
            </div>
            <p style={{ color: "red" }}>{error}</p>
            <p>{isLoading ? <img style={{ width: 50, height: 50 }} src="/loading.gif" /> : ""}</p>
        </div>
    );
};
