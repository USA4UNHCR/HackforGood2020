import { interfaces } from "inversify";
import { useContext } from "react";
import { InjectionContext } from "./InjectionProvider";

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
    const container = useContext(InjectionContext);
    if (!container) {
        throw new Error("Could not find a container in the InjectionContext");
    }

    return container.get<T>(identifier);
}