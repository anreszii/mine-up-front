import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { Client, Authenticator } from "minecraft-launcher-core";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

const runMC = (token, minRAM, maxRAM, event, version) => {
  const launcher = new Client();
  const opts = {
    clientPackage: null,
    authorization: token,
    root: "./minecraft",
    version: {
      number: version,
      type: "release",
    },
    memory: {
      max: minRAM,
      min: maxRAM,
    },
  };
  launcher.launch(opts);
  launcher.on("debug", (e) => console.log(e));
  launcher.on("data", (e) => console.log(e));
  launcher.on("download", () => event.reply("loadingStart"));
  launcher.on("progress", () => event.reply("loading"));
  launcher.on("arguments", () => event.reply("starting"));
  launcher.on("close", () => event.reply("closed"));
};
const logIn = (event, username, password, minRAM, maxRAM, version) => {
  if (password) {
    Authenticator.getAuth(username, password)
      .then((token) => runMC(token, minRAM, maxRAM, event, version))
      .catch((err) => {
        console.log(err);
        event.reply("loginError", { error: "Login/passwordword Error" });
      });
  } else {
    Authenticator.getAuth(username).then((token) =>
      runMC(token, minRAM, maxRAM, event, version)
    );
  }
};

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("memory", (event, arg) => {
  console.log(event, arg.maxRAM, arg.minRAM);
});

ipcMain.on("logIn", (event, arg) => {
  logIn(event, arg.username, arg.password, arg.maxRAM, arg.minRAM, arg.version);
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
