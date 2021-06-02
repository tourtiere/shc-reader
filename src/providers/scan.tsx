import { createContext, FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

interface Payload {}

interface ScanContext {
    setPayload: (result: Payload) => void;
    payload?: Payload;
}

export const ScanContext = createContext<ScanContext>({
    setPayload: (_: Payload) => ({}),
});

export const ScanProvider: FunctionalComponent = (props) => {
    const [payload, setPayload] = useState<Payload | undefined>(undefined);

    return (
        <ScanContext.Provider value={{ payload, setPayload }}>
            {props.children}
        </ScanContext.Provider>
    );
};
