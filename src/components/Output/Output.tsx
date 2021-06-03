import { h, JSX } from "preact";
import { useContext } from "preact/hooks";
import { ScanContext } from "providers/scan";
import "./Output.scss";
import { Resource } from "types/SHC";

function extractObject(property: string, value: any) {
    if (property === "performer") return value.map((p: any) => p.actor.display).join(", ");

    return JSON.stringify(value);
}

function getProperties(resource: Object, except: string[] = []) {
    const list = [];
    for (const property in resource) {
        if (except.indexOf(property) === -1) {
            const value = (resource as any)[property];
            list.push(
                <div class="subrow-wrapper">
                    <div class="subrow">{property}:</div>
                    <div class="subrow">
                        {typeof value === "string" ? value : extractObject(property, value)}
                    </div>
                </div>
            );
        }
    }
    return <div class="row">{list}</div>;
}
function getResource(resource: Resource): JSX.Element {
    if (resource.resourceType === "Patient") {
        const name = resource.name?.map((names) =>
            [names.given, names.family]
                .map((name) => (typeof name === "string" ? name : name.join(" ")))
                .join(" ")
        );
        return (
            <div class="row">
                <div class="subrow-wrapper">
                    <div class="subrow name">{name}</div>
                </div>
                {getProperties(resource, ["resourceType", "name"])}
            </div>
        );
    }

    return <div class="row">{getProperties(resource)}</div>;
}

export default (): JSX.Element | null => {
    const { error, payload, setPayload } = useContext(ScanContext);
    if (payload === undefined) return null;
    if (error) return <div class="output">{"Error"}</div>;

    return (
        <div class="output">
            {payload.vc.credentialSubject.fhirBundle.entry.map(({ resource }) =>
                getResource(resource)
            )}
        </div>
    );
};
