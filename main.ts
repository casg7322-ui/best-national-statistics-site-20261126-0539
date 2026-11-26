// HanStat — South Korea in Numbers. Entry program (Node 22, standard library only).
//
// The site lives in app/ beside this file: plain static files (HTML, CSS and
// ES modules, no build step) that a browser opens at app/index.html. Nothing
// it runs, styles or shows loads over the network; every figure it shows is
// held in its own data file with its source and year.
//
// This program hands the site in. It copies app/ and screenshots/ from
// beside this file into the output directory and writes dossier.json there,
// the summary the judge reads (the screenshots, the first load's files and
// bytes, and the site's source), built with the vendored make.fun library.
// vendor/makefun-frontend.ts is the kit's copy, left exactly as shipped:
// the scorer rebuilds the dossier with its own copy and compares the two
// byte for byte.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The program writes only under the output directory — never to the
// repository, never to the working directory, never to a relative path.

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, "app"), join(outputDir, "app"), { recursive: true });
mkdirSync(join(outputDir, "screenshots"), { recursive: true });
if (existsSync(join(repoRoot, "screenshots"))) {
  cpSync(join(repoRoot, "screenshots"), join(outputDir, "screenshots"), { recursive: true });
}

// The scorer's caps (from the kit's reference/gate.json): at most 4
// screenshots, each at most 256 KiB; app/ at most 993 files and
// directories and 16 MiB in all; the dossier text at most 160 KiB.
writeFileSync(
  join(outputDir, "dossier.json"),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
