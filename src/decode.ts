import fs from "fs";
import path from "node:path";
import { getCurrentRoute } from "./helpers";
import unzipper from "unzipper";

export const decodeProject = (filePathContainsProjectEncoded: string) => {
  try {
    const currentRoute = getCurrentRoute();
    const decodedFolderName = `decodedproject-${Date.now()}`;
    fs.mkdirSync(decodedFolderName);
    const decodedPathName = path.join(currentRoute, decodedFolderName);

    const fileBase64Content = fs.readFileSync(
      filePathContainsProjectEncoded,
      "utf-8"
    );
    const zipBuffer = Buffer.from(fileBase64Content, "base64");

    const zipPath = path.join(currentRoute, "temp.zip");
    fs.writeFileSync(zipPath, zipBuffer);

    fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: decodedPathName }))
      .on("close", () => {
        fs.unlinkSync(zipPath);
        console.log("Your project was dedoded here", decodedPathName);
      });
  } catch (error) {
    console.error((error as Error).message);
  }
};
