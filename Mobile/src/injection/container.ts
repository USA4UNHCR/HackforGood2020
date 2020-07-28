import { Container } from "inversify";


export const UnhcrContainer = new Container({ defaultScope: "Singleton"});
configureContainer(UnhcrContainer);

export function configureContainer(container: Container) {
    // do all the binds and stuff
}
