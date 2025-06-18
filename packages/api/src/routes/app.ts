// import { Router } from "express";
// import { exec } from "child_process";
// import { promisify } from "util";
// import path from "path";
// import fs from "fs";

// const execAsync = promisify(exec);
// const router = Router();

// // ... existing code ...

// router.post("/generate-app", async (req, res) => {
//   try {
//     const { name, url, icon } = req.body;

//     if (!name || !url) {
//       return res.status(400).json({ error: "Name and URL are required" });
//     }

//     // Create a temporary directory for the build
//     const tempDir = path.join(__dirname, "../../temp-build");
//     if (!fs.existsSync(tempDir)) {
//       fs.mkdirSync(tempDir, { recursive: true });
//     }

//     // Copy the electron app to the temp directory
//     await execAsync(
//       `cp -r ${path.join(__dirname, "../../../electron/*")} ${tempDir}`
//     );

//     // Update the package.json with custom values
//     const packageJsonPath = path.join(tempDir, "package.json");
//     const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
//     packageJson.productName = name;
//     packageJson.build.productName = name;

//     // Update the main.js with the custom URL
//     const mainJsPath = path.join(tempDir, "main.js");
//     let mainJs = fs.readFileSync(mainJsPath, "utf8");
//     mainJs = mainJs.replace(/loadURL\(['"].*['"]\)/, `loadURL('${url}')`);
//     fs.writeFileSync(mainJsPath, mainJs);

//     // If an icon is provided, save it
//     if (icon) {
//       const iconPath = path.join(tempDir, "build/icon.png");
//       fs.writeFileSync(iconPath, Buffer.from(icon.split(",")[1], "base64"));
//     }

//     // Build the app
//     await execAsync("npm run build:mac", { cwd: tempDir });

//     // Get the path to the built app
//     const distPath = path.join(tempDir, "dist");
//     const dmgFile = fs
//       .readdirSync(distPath)
//       .find((file) => file.endsWith(".dmg"));

//     if (!dmgFile) {
//       throw new Error("Build failed - no DMG file found");
//     }

//     // Send the file
//     res.download(path.join(distPath, dmgFile), `${name}.dmg`, (err) => {
//       if (err) {
//         console.error("Error sending file:", err);
//       }
//       // Clean up
//       fs.rmSync(tempDir, { recursive: true, force: true });
//     });
//   } catch (error) {
//     console.error("Error generating app:", error);
//     res.status(500).json({ error: "Failed to generate application" });
//   }
// });

// export default router;
