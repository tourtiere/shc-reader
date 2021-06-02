import { h, render } from "preact";
import { App } from "./app/app";

const rootElement: HTMLElement | null = document.getElementById("app");

if (rootElement?.hasChildNodes()) {
    if (rootElement && rootElement.firstElementChild)
        render(<App />, rootElement, rootElement.firstElementChild);
} else {
    if (rootElement) render(<App />, rootElement);
}
