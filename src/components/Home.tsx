import { h } from "preact";
import { useContext } from "preact/hooks";
import { ScanContext } from "providers/scan";
import "../static/GitHub_Logo.png";

export default () => {
    const { setPayload } = useContext(ScanContext);

    return (
        <div className={"home-page"}>
            <p>Hello world</p>
        </div>
    );
};
