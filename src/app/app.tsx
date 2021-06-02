import { Component, h, JSX } from "preact";
import { ScanProvider } from "../providers/scan";
import "./app.scss";
import { router } from "./router";

export class App extends Component {
    render(): JSX.Element {
        return <ScanProvider>{router(location)}</ScanProvider>;
    }
}
