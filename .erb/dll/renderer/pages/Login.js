"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const minecraft_launcher_js_1 = require("minecraft-launcher-js");
const Login = () => {
    const launcher = new minecraft_launcher_js_1.MinecraftLauncher({
        authentication: {
            name: "Player",
        },
        memory: {
            max: 2048,
            min: 1024,
        },
        version: {
            number: "1.19.3",
            type: "release",
        },
    });
    async function main() {
        launcher.prepare();
        await launcher.download();
        await launcher.start();
    }
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { onClick: () => main(), children: "Open" }) }) }));
};
exports.Login = Login;
//# sourceMappingURL=Login.js.map