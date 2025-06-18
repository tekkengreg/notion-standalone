import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { name, url, icon } = await request.json();

    if (!name || !url) {
      return NextResponse.json(
        { error: "Name and URL are required" },
        { status: 400 }
      );
    }

    const electronDir = path.join(process.cwd(), "../electron");
    console.log("Using Electron project at:", electronDir);

    // Update the package.json with custom values
    const packageJsonPath = path.join(electronDir, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.productName = name;
    packageJson.build.productName = name;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Update the main.js with the custom URL
    const mainJsPath = path.join(electronDir, "main.js");
    let mainJs = fs.readFileSync(mainJsPath, "utf8");
    mainJs = mainJs.replace(/loadURL\(['"].*['"]\)/, `loadURL('${url}')`);
    fs.writeFileSync(mainJsPath, mainJs);

    // If an icon is provided, save it
    if (icon) {
      const iconPath = path.join(electronDir, "build/icon.png");
      fs.writeFileSync(iconPath, Buffer.from(icon.split(",")[1], "base64"));
    }

    // Build the app using the electron project
    console.log("Building the app...");
    await execAsync("pnpm run build:mac", { cwd: electronDir });

    // Get the path to the built app
    const distPath = path.join(electronDir, "dist");
    const dmgFile = fs
      .readdirSync(distPath)
      .find((file) => file.endsWith(".dmg"));

    if (!dmgFile) {
      throw new Error("Build failed - no DMG file found");
    }

    // Read the file
    const filePath = path.join(distPath, dmgFile);
    const fileBuffer = fs.readFileSync(filePath);

    // Return the file
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${name}.dmg"`,
      },
    });
  } catch (error) {
    console.error("Error generating app:", error);
    return NextResponse.json(
      { error: "Failed to generate application" },
      { status: 500 }
    );
  }
}
