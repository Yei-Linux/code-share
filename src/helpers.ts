import fs from "node:fs";

export const getCurrentRoute = () => process.cwd();

export const isFolder = (route: string) => {
  const stats = fs.statSync(route);
  return stats.isDirectory();
};
