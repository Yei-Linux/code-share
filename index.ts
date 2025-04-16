#!/usr/bin/env node
import { select, input } from "@inquirer/prompts";

import { decodeProject } from "./src/decode";
import { encodeProject } from "./src/encode";

const run = async () => {
  try {
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
      const hasEncryption = await select({
        message: "do you want to encrypt it?",
        choices: [
          {
            name: "yes",
            value: "yes",
            description: "yes",
          },
          {
            name: "no",
            value: "no",
            description: "no",
          },
        ],
      });

      let cryptPassword = undefined;
      if (hasEncryption === "yes") {
        cryptPassword = await input({
          message: "Enter your pasword to encrypt and please store it",
        });
      }

      encodeProject(cryptPassword);
      return;
    }

    const hasEncryption = await select({
      message: "do you have a crypt password?",
      choices: [
        {
          name: "yes",
          value: "yes",
          description: "yes",
        },
        {
          name: "no",
          value: "no",
          description: "no",
        },
      ],
    });

    let decryptPassword = undefined;
    if (hasEncryption === "yes") {
      decryptPassword = await input({
        message: "Enter your pasword to encrypt and please store it",
      });
    }

    const filePathContainsProjectEncoded = await input({
      message: "Enter the file path where it is the enconded file",
    });

    decodeProject(filePathContainsProjectEncoded, decryptPassword);
  } catch (error) {
    console.log("[CliError]: ", (error as Error).message);
  }
};

run();
