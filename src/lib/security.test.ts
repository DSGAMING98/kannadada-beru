import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import nextConfig from "../../next.config";

describe("public environment boundary", () => {
  it("does not expose privileged keys through NEXT_PUBLIC names", () => {
    const sourceRoot = path.resolve(process.cwd(), "src");
    const files: string[] = [];
    const walk = (directory: string) => fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : files.push(path.join(directory, entry.name)));
    walk(sourceRoot);
    const source = files.filter((file) => /\.(ts|tsx)$/.test(file)).map((file) => fs.readFileSync(file, "utf8")).join("\n");
    const forbiddenPublicKey = "NEXT_PUBLIC_" + "SUPABASE_SERVICE_ROLE_KEY";
    expect(source).not.toContain(forbiddenPublicKey);
  });

  it("ships browser security headers without granting microphone or geolocation", async () => {
    const rules = await nextConfig.headers?.();
    const global = rules?.find((rule) => rule.source === "/(.*)");
    const headers = Object.fromEntries(global?.headers.map(({ key, value }) => [key, value]) ?? []);
    expect(headers["Content-Security-Policy"]).toContain("frame-ancestors 'none'");
    expect(headers["Content-Security-Policy"]).toContain("object-src 'none'");
    expect(headers["Permissions-Policy"]).toContain("microphone=()");
    expect(headers["Permissions-Policy"]).toContain("geolocation=()");
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
  });

  it("ignores private data, recordings, environment files, and Android signing material", () => {
    const ignore = fs.readFileSync(path.resolve(process.cwd(), ".gitignore"), "utf8");
    for (const entry of [".env", "recordings/", "data/private/", "*.jks", "*.keystore", "keystore.properties"]) {
      expect(ignore).toContain(entry);
    }
  });
});
