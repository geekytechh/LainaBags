import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create FlatCompat instance for extending legacy ESLint configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Export ESLint config using FlatCompat to extend Next.js rules
const eslintConfig = [...compat.extends("next/core-web-vitals")];

export default eslintConfig;
