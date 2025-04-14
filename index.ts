#!/usr/bin/env node
import { select, input } from "@inquirer/prompts";

import { decodeProject } from "./src/decode";
import { encodeProject } from "./src/encode";

const run = async () => {
  const action = await select({
    message: "What action do you want to execute?",
    choices: [
      {
        name: "decode",
        value: "decode",
        description: "Decode",
      },
      {
        name: "encode",
        value: "encode",
        description: "Encode",
      },
    ],
  });

  if (action === "encode") {
    encodeProject();
    return;
  }

  const filePathContainsProjectEncoded = await input({
    message: "Enter the file path where it is the enconded file",
  });
  decodeProject(filePathContainsProjectEncoded);
};

run();
