import { run } from "./cli";

const args = process.argv.slice(2);
const configPath = args[0] || "prisma-field-omitter.config.json";

run({
    configPath,
    parallel: parseInt(process.env.PARALLEL || String(navigator.hardwareConcurrency)),
    verbose: process.env.VERBOSE === "true"
}).catch(console.error);
