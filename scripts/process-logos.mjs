import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const BRANDS_DIR = path.resolve("public/images/brands");

async function processLogo(inputPath, outputPath) {
  const image = sharp(inputPath).ensureAlpha();
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Make near-white pixels transparent, and convert any remaining pixels to white
  const threshold = 230;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r > threshold && g > threshold && b > threshold) {
      data[i + 3] = 0; // transparent
    } else {
      // Convert non-background pixels to pure white
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(outputPath);

  console.log(`✓ ${path.basename(outputPath)}`);
}

const jobs = [
  {
    input: "StPetersCollege_Logo_Horiz.png",
    output: "st-peters-college.png",
  },
  {
    input: "nothinglogo.png",
    output: "nothing.png",
  },
];

for (const job of jobs) {
  const input = path.join(BRANDS_DIR, job.input);
  const output = path.join(BRANDS_DIR, job.output);
  try {
    await fs.access(input);
    await processLogo(input, output);
  } catch (err) {
    console.warn(`✗ skipping ${job.input}: ${err.message}`);
  }
}
