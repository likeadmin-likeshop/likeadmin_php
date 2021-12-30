import { App } from "vue";

const modules = require.context("./modules", false, /\.ts$/);

export default (app: App<Element>) => {
    modules.keys().forEach((key) => {
        const name = key.replace(/^\.\/(.*)\.\w+$/, "$1");
        app.directive(name, modules(key).default);
    });
};
