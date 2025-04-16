import fs from "fs";
import path from "node:path";
import { getCurrentRoute } from "./helpers";
import unzipper from "unzipper";
import { decrypt } from "./crypt";

export const decodeProject = (
  filePathContainsProjectEncoded: string,
  cryptedPassword?: string
) => {
  try {
    const currentRoute = getCurrentRoute();
    const decodedFolderName = `decodedproject-${Date.now()}`;
    fs.mkdirSync(decodedFolderName);
    const decodedPathName = path.join(currentRoute, decodedFolderName);

    const fileBase64Content = fs.readFileSync(
      filePathContainsProjectEncoded,
      "utf-8"
    );

    if (!cryptedPassword && fileBase64Content.includes("ENC-CODESHARE::")) {
      throw new Error("You have to use a password");
    }

    const content = cryptedPassword
      ? decrypt(fileBase64Content, cryptedPassword)
      : fileBase64Content;
    const zipBuffer = Buffer.from(content, "base64");

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
