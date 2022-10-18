#! /usr/bin/env ts-node-script
/* eslint-disable no-console */
import Version from "./version";

const main = async () => {
  const args = process.argv.slice(2);
  try {
    switch (args[0]) {
      case "version": {
        if (args.includes("--package")) {
          const index = args.findIndex((arg) => arg === "--package");
          const packageName = args[index + 1];
          const version = new Version(packageName, args);
          await version.run();
        } else {
          throw new Error("No package name provided");
        }
        break;
      }
      default: {
        console.info(`
          Usage: @jetvil/cli <command>
          Commands:
            version - check if the local version is outdated compared to the npm version
        `);
      }
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

main();
