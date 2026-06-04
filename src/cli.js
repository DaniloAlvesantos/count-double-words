// Command Line Interface
import fs from "node:fs";
import path from "node:path";
import { errorTreats } from "./errors/errorFunctions.js";
import { countWords } from "./index.js";
import { mountOutputFile } from "./helpers.js";
import { Command } from ".pnpm/commander@15.0.0/node_modules/commander";
import chalk from ".pnpm/chalk@5.6.2/node_modules/chalk";

const program = new Command();

program
  .version("0.0.1")
  .description("A CLI tool to count repeated words in a text file")
  .option("-i, --input <string>", "Path to the input text file")
  .option("-o, --output <string>", "Path to the output directory")
  .action((options) => {
    const { input, output } = options;

    if (!input || !output) {
      console.error(
        chalk.red("Error: Both input and output paths are required."),
      );
      program.help();
      return;
    }

    try {
      const inputPath = path.resolve(input);
      const outputPath = path.resolve(output);

      // using sync methods here for freeze the execution and check the paths before processing the file
      if (!fs.existsSync(inputPath)) {
        throw new Error(`Input file does not exist: ${inputPath}`);
      }

      if (!fs.existsSync(outputPath)) {
        throw new Error(`Output directory does not exist: ${outputPath}`);
      }

      processFile(inputPath, outputPath);
    } catch (err) {
      errorTreats(err);
    }
  });

program.parse();

// const path = process.argv;
// const link = path[2];
// const filePath = path[3];

function processFile(inputPath, outputPath) {
  fs.readFile(inputPath, "utf-8", (err, data) => {
    try {
      if (err) throw err;
      const result = countWords(data);
      createAndSaveFile(result, outputPath);
    } catch (err) {
      errorTreats(err);
    }
  });
}

async function createAndSaveFile(wordsList, filePath) {
  const newFile = `${filePath}/result.txt`;
  const wordsText = mountOutputFile(wordsList);

  try {
    await fs.promises.writeFile(newFile, wordsText, "utf-8");
    console.log(chalk.green(`File created successfully at ${newFile}`));
  } catch (err) {
    throw new Error(`Failed to create file: ${err.message}`);
  }
}
