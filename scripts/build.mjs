import { spawnSync } from "node:child_process";

const hasTinaCloud =
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID) && Boolean(process.env.TINA_TOKEN);

const tinaArgs = hasTinaCloud
  ? ["tinacms", "build", "--content=local", "-c", "astro build"]
  : ["tinacms", "build", "--local", "--skip-cloud-checks", "-c", "astro build"];

const result = spawnSync("npx", tinaArgs, {
  stdio: "inherit",
  shell: false
});

process.exit(result.status ?? 1);
