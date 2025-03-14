#!/usr/bin/env tsx
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const esbuild_1 = __importDefault(require("esbuild"));
const isWatchMode = process.argv.includes("--watch");
const options = {
    color: true,
    logLevel: "info",
    entryPoints: ["src/extension.ts"],
    bundle: true,
    metafile: process.argv.includes("--metafile"),
    outfile: process.argv.includes("--browser")
        ? "./dist/extension.browser.js"
        : "./dist/extension.umd.js",
    external: ["vscode", "typescript"],
    format: "cjs",
    platform: process.argv.includes("--browser") ? "browser" : "node",
    target: "ESNext",
    tsconfig: "./tsconfig.json",
    sourcemap: process.argv.includes("--sourcemap"),
    minify: true,
    plugins: [
        {
            name: "umd2esm",
            setup(build) {
                build.onResolve({ filter: /^(vscode-.*|estree-walker|jsonc-parser)/ }, (args) => {
                    const pathUmdMay = require.resolve(args.path, {
                        paths: [args.resolveDir],
                    });
                    // Call twice the replace is to solve the problem of the path in Windows
                    const pathEsm = pathUmdMay
                        .replace("/umd/", "/esm/")
                        .replace("\\umd\\", "\\esm\\");
                    return { path: pathEsm };
                });
            },
        },
        {
            name: "meta",
            setup(build) {
                build.onEnd(async (result) => {
                    if (result.metafile && result.errors.length === 0) {
                        return promises_1.default.writeFile(node_path_1.default.resolve(__dirname, "../meta.json"), JSON.stringify(result.metafile));
                    }
                });
            },
        },
    ],
};
async function main() {
    let ctx;
    try {
        if (isWatchMode) {
            ctx = await esbuild_1.default.context(options);
            await ctx.watch();
        }
        else {
            const result = await esbuild_1.default.build(options);
            if (process.argv.includes("--analyze")) {
                const chunksTree = await esbuild_1.default.analyzeMetafile(result.metafile, {
                    color: true,
                });
                console.log(chunksTree);
            }
        }
    }
    catch (error) {
        console.error(error);
        ctx?.dispose();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=esbuild.js.map