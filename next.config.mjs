import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this project so Next stops picking up
  // unrelated lockfiles in C:\Users\USER\.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
