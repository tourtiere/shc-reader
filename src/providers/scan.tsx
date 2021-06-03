import { createContext, FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import Payload from "types/SHC";

interface ScanContext {
    setPayload: (result: Payload) => void;
    setError: (error: string | undefined) => void;
    payload?: Payload;
    error?: string;
}

export const ScanContext = createContext<ScanContext>({
    setPayload: (_: Payload) => ({}),
    setError: (_: string | undefined) => ({}),
});

export const ScanProvider: FunctionalComponent = (props) => {
    const [payload, setPayload] = useState<Payload | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    return (
        <ScanContext.Provider value={{ payload, setPayload, error, setError }}>
            {props.children}
        </ScanContext.Provider>
    );
};
