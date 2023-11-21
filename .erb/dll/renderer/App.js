"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const Login_1 = require("./pages/Login");
function App() {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.MemoryRouter, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Login_1.Login, {}) }) }) }));
}
exports.default = App;
//# sourceMappingURL=App.js.map