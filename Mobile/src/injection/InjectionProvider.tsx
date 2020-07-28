import { Container } from "inversify";
import * as React from "react";

/**
 * React Context that brokers access to a dependency injection container.
 */
export const InjectionContext = React.createContext<Container | null>(null);

type Props = {
    container: Container;
};

/**
 * Provider that the app uses to share a dependency injection container with its children.
 */
export const InjectionProvider: React.FunctionComponent<Props> = props => {
    return <InjectionContext.Provider value={props.container}>{props.children}</InjectionContext.Provider>;
};
InjectionProvider.displayName = "InjectionProvider";
