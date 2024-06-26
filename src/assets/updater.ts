import { check } from "@tauri-apps/plugin-updater";
import { ask } from "@tauri-apps/plugin-dialog";
import { relaunch } from "@tauri-apps/plugin-process";

export async function checkForAppUpdates() {
  const update = await check();

  if (update?.available) {
    const wantsToUpdate = await ask(
      `Update to ${update.version} is available`,
      {
        title: "Update available",
        kind: "info",
        okLabel: "Update",
        cancelLabel: "No thanks",
      }
    );

    if (wantsToUpdate) {
      await update.downloadAndInstall();
      await relaunch();
    }
  }
}