import fs from "node:fs";
import path from "node:path";
import { getCurrentRoute, isFolder } from "./helpers";

const foldersToOmit = ["node_modules"];

const getFileContentInBase64 = (route: string) => {
  const fileContent = fs.readFileSync(route);
  const encoded = fileContent.toString("base64");
  return encoded;
};

const readTree = (route: string) => {
  const treeDirArr = fs
    .readdirSync(route)
    .filter((childrenName) => !foldersToOmit.includes(childrenName))
    .map((childrenName) => {
      const fullPath = path.join(route, childrenName);
      if (isFolder(fullPath)) return [childrenName, readTree(fullPath)];
      return [childrenName, getFileContentInBase64(fullPath)];
    });

  return Object.fromEntries(treeDirArr);
};

export const encodeProject = () => {
  try {
    const currentRoute = getCurrentRoute();
    const projectObjInBase64 = readTree(currentRoute);
    const projectObjInBase64Encoded = btoa(JSON.stringify(projectObjInBase64));

    const fileName = `encodedproject-${Date.now()}.txt`;
    fs.writeFileSync(fileName, projectObjInBase64Encoded);

    console.log("Your project was encoded here: ", fileName);
  } catch (error) {
    console.error((error as Error).message);
  }
};
