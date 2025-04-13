import fs from "fs";
import path from "node:path";
import { getCurrentRoute } from "./helpers";

const decodeContent = (childrenContent: any) => {
  if (typeof childrenContent === "object") {
    return childrenContent as any;
  }

  return atob(childrenContent) as string;
};

const readTree = (tree: any, treePath: string) => {
  Object.entries(tree).forEach(([childrenName, childrenContent]) => {
    const decodedChildrenContent = decodeContent(childrenContent);
    const fullPath = path.join(treePath, childrenName);
    if (typeof childrenContent === "object") {
      fs.mkdirSync(fullPath);
      readTree(decodedChildrenContent, fullPath);
      return;
    }

    fs.writeFileSync(fullPath, decodedChildrenContent);
  });
};

export const decodeProject = (filePathContainsProjectEncoded: string) => {
  try {
    const isExists = fs.existsSync(filePathContainsProjectEncoded);
    if (!isExists) throw new Error("This file does not exist");

    const contentFileBase64 = fs
      .readFileSync(filePathContainsProjectEncoded)
      .toString("utf8");
    if (!contentFileBase64) throw new Error("This file does have any content");

    const folderName = `decoded-project-${Date.now()}`;
    const pathFolderToCreate = path.join(getCurrentRoute(), folderName);
    fs.mkdirSync(pathFolderToCreate);

    const stringParsed = atob(contentFileBase64);
    const jsonParsed = JSON.parse(stringParsed);

    readTree(jsonParsed, pathFolderToCreate);
    console.log("Your project was dedoded here: ", folderName);
  } catch (error) {
    console.error((error as Error).message);
  }
};
