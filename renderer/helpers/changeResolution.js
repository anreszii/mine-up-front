export const changeResolution = () => {
  window.ipc.send("window-change-resolution");
  window.ipc.send("window-change-resolution");
};
