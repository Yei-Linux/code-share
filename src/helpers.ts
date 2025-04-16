export const getCurrentRoute = () => process.cwd();

export const ignoreFolderFiles = [
  // Node.js
  "node_modules/",
  "npm-debug.log*",
  "yarn-debug.log*",
  "yarn-error.log*",
  "pnpm-debug.log*",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",

  // Dist/build output
  "dist/",
  "build/",
  ".next/",
  "out/",
  ".turbo/",
  "coverage/",
  ".parcel-cache/",
  ".cache/",
  ".vite/",
  ".vercel/",
  ".expo/",
  ".expo-shared/",

  // Environment
  ".env",
  ".env.*",
  "*.local",

  // Logs & temp
  "logs/",
  "*.log",
  "tmp/",
  "temp/",
  ".DS_Store",
  "Thumbs.db",

  // Git
  ".git/",
  ".gitignore",

  // OS-specific
  ".DS_Store",
  "Thumbs.db",
  "desktop.ini",
  "Icon\r",

  // Editor settings
  ".vscode/",
  ".idea/",
  "*.sublime-project",
  "*.sublime-workspace",

  // TypeScript
  "*.tsbuildinfo",

  // Python
  "__pycache__/",
  "*.py[cod]",
  "*.pyo",
  "*.pyc",
  ".venv/",
  "venv/",

  // Java
  "target/",
  "*.class",

  // Go
  "bin/",
  "pkg/",

  // Mac OS tags
  ".Spotlight-V100",
  ".Trashes",

  // Archives
  "*.zip",
  "*.tar",
  "*.tar.gz",
  "*.rar",
  "*.7z",
  "*.mp4",

  // Compiled files
  "*.exe",
  "*.dll",
  "*.so",
  "*.dylib",
  "*.bin",

  // Test output
  "test-results/",
  "junit.xml",
  "test-report.xml",

  // Project-specific
  ".env.local",
  ".env.production",
  "firebase-debug.log",
  "firebase-debug.*.log",
];
