import crypto from "crypto";

const algorithm = "aes-256-cbc";

export function encrypt(text: string, password: string): string {
  const key = crypto.createHash("sha256").update(password).digest();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  return `ENC-CODESHARE::${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decrypt(encryptedText: string, password: string): string {
  if (!encryptedText.includes("ENC-CODESHARE::")) {
    return encryptedText;
  }

  try {
    const [ivHex, encryptedHex] = encryptedText
      .replace(/ENC-CODESHARE::/g, "")
      .split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const key = crypto.createHash("sha256").update(password).digest();

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  } catch (error) {
    throw new Error(
      "Error while trying to decrypt. Please review your password"
    );
  }
}
