import { h } from "preact";
import Scanner from "components/Scanner/Scanner";
import Output from "components/Output/Output";
import "static/GitHub_Logo.png";

export default () => {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Smart Health Card Reader</h1>
            <p style={{ textAlign: "center" }}>
                Select your QR code here. It will not be uploaded.
            </p>
            <Scanner />
            <Output />
        </div>
    );
};
