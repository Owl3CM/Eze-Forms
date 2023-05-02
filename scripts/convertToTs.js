const fs = require("fs");
const path = require("path");

function convertJsToTsx(filePath) {
  // Read the .js file
  const code = fs.readFileSync(filePath, "utf8");
  // Modify the code to include TypeScript and JSX syntax
  const tsxCode = `${code.replace(/React\.createClass/g)}`;
  // Create a new file path with the .tsx extension
  const tsxFilePath = filePath.replace(/\.js$/, ".tsx");

  // Write the modified code to the new .tsx file
  fs.writeFileSync(tsxFilePath, tsxCode);
}

// Set the directory path to search for .js files
const dirPath = "./src/lib";

// Recursively search for all .js files in the directory
function findJsFiles(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findJsFiles(filePath);
    } else if (file.endsWith(".js")) {
      convertJsToTsx(filePath);
    }
  }
}

findJsFiles(dirPath);
