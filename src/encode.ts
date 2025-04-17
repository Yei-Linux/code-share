import fs from "node:fs";
import path from "node:path";
import { getCurrentRoute, ignoreFolderFiles } from "./helpers";
import archiver from "archiver";
import ignore from "ignore";
import { globSync } from "glob";
import { encrypt } from "./crypt";

const getIgnoreFiles = (currentRoute: string) => {
  let gitIgnoreData: string[] = [];
  const ig = ignore();
  const ignoreFilePath = path.join(currentRoute, ".gitignore");

  const isExist = fs.existsSync(ignoreFilePath);
  if (isExist) {
    const gitIgnoreFile = fs.readFileSync(ignoreFilePath, "utf-8");
    gitIgnoreData = gitIgnoreFile.split("\n");
  }

  const ignoreFilesSet = [...new Set([...gitIgnoreData, ...ignoreFolderFiles])];
  ig.add(ignoreFilesSet);
  return ig;
};

export const encodeProject = async (cryptPassword?: string) => {
  try {
    const currentRoute = getCurrentRoute();

    const zipPath = path.join(currentRoute, "temp.zip");
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(output);

    const ignoreFiles = getIgnoreFiles(currentRoute);
    const files = globSync("**/*", {
      cwd: currentRoute,
      dot: true,
      nodir: true,
    });

    for (const file of files) {
      if (ignoreFiles && !ignoreFiles.ignores(file)) {
        archive.file(path.join(currentRoute, file), { name: file });
      }
    }

    await archive.finalize();
    output.on("close", () => {
      const zipBuffer = fs.readFileSync(zipPath);
      const base64 = zipBuffer.toString("base64");

      const crypted = cryptPassword ? encrypt(base64, cryptPassword) : base64;

      const fileName = `encodedproject-${Date.now()}.txt`;
      fs.writeFileSync(fileName, crypted, "utf8");
      fs.unlinkSync(zipPath);
      console.log("Your project was encoded here: ", fileName);
    });
  } catch (error) {
    console.error((error as Error).message);
  }
};
