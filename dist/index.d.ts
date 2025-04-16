declare module '@yei-linux/codeshare/index' {
  #!/usr/bin/env node
  export {};

}
declare module '@yei-linux/codeshare/src/decode' {
  export const decodeProject: (filePathContainsProjectEncoded: string) => void;

}
declare module '@yei-linux/codeshare/src/encode' {
  export const encodeProject: () => Promise<void>;

}
declare module '@yei-linux/codeshare/src/helpers' {
  export const getCurrentRoute: () => string;
  export const ignoreFolderFiles: string[];

}
declare module '@yei-linux/codeshare' {
  import main = require('@yei-linux/codeshare/index');
  export = main;
}