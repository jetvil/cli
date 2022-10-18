/* eslint-disable no-console */
import { execSync } from "child_process";
import { readFile } from "fs/promises";

class Version {
  private _package: string;
  private _args: string[];
  public constructor(packageName: string, args: string[] = []) {
    this._package = packageName;
    this._args = args;
  }
  public async run(): Promise<void> {
    if (this._includes("--help")) {
      this._showDefaultText();
      process.exit(0);
    }

    const localVersion = await this._getLocalVersion();
    const npmVersion = await this._getNpmVersion();

    if (this._isOutdatedVersion(npmVersion, localVersion)) {
      throw new Error("Outdated version");
    }
  }
  private async _getLocalVersion(): Promise<string> {
    const packageJSON = await readFile("./package.json", "utf8");
    return JSON.parse(packageJSON).version || "0.0.0";
  }
  private async _getNpmVersion(): Promise<Array<string>> {
    return JSON.parse(execSync(`npm view ${this._package} versions --json`).toString().trim());
  }
  private _includes(property: string): boolean {
    return this._args.includes(property);
  }
  private _showDefaultText(): void {
    console.log(`
      Usage: \`@jetvil/cli version\` --package <package>
      Arguments:
        --package <package> - package name
        --help - show this help
      Checks if the local version is outdated compared to the npm version: checks if the version exists in the npm registry.
    `);
  }
  private _isOutdatedVersion(_npm: string[], _local: string): boolean {
    return _npm.includes(_local);
  }
}

export default Version;
