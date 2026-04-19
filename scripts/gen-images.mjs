import { fal } from "@fal-ai/client";
import { writeFileSync } from "fs";
import { mkdir } from "fs/promises";

// .env.local からキーを読み込み
import { readFileSync } from "fs";
const env = readFileSync(".env.local", "utf-8");
const falKey = env.match(/FAL_KEY=(.+)/)?.[1]?.trim();
if (!falKey) { console.error("FAL_KEY not found"); process.exit(1); }

fal.config({ credentials: falKey });

async function generate(prompt, filename, aspectRatio = "16:9") {
  console.log(`\n🎨 生成中: ${filename}`);
  const result = await fal.subscribe("fal-ai/nano-banana-pro", {
    input: {
      prompt,
      num_images: 1,
      aspect_ratio: aspectRatio,
      resolution: "2K",
      safety_tolerance: "4",
      output_format: "webp",
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs?.map((log) => log.message).forEach((m) => console.log(" ", m));
      }
    },
  });

  const imageUrl = result.data?.images?.[0]?.url;
  if (!imageUrl) throw new Error("画像URLが取得できませんでした: " + JSON.stringify(result.data));

  console.log(`  URL: ${imageUrl}`);

  // 画像をダウンロードして保存
  const res = await fetch(imageUrl);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir("public", { recursive: true });
  writeFileSync(`public/${filename}`, buf);
  console.log(`  ✅ 保存完了: public/${filename} (${buf.length} bytes)`);
}

await generate(
  "AI engineer beauty industry, kawaii vector style, pastel colors, futuristic beauty salon, soft pink and cyan gradient, minimal clean design, wide banner, flat illustration, 2K resolution",
  "hero-bg.webp",
  "16:9"
);

await generate(
  "professional AI engineer portrait, kawaii illustration style, pastel colors, beauty tech aesthetic, cute chibi character, round face, laptop, sparkles, soft gradient background",
  "about-profile.webp",
  "1:1"
);

console.log("\n🎉 全画像生成完了！");
