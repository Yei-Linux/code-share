#!/usr/bin/env node
import { decodeProject } from "./src/decode";
import { encodeProject } from "./src/encode";

const run = () => {
  const args = process.argv;
  const filePathContainsProjectEncoded = args[2];

  if (!filePathContainsProjectEncoded) {
    encodeProject();
    return;
  }

  decodeProject(filePathContainsProjectEncoded);
};

run();
