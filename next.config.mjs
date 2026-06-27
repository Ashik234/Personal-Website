import { execSync } from "node:child_process";

// Resolve the last git commit date at build time so the footer "Last updated"
// reflects the repo's latest commit rather than the day the page is viewed.
function getLastCommitDate() {
  try {
    return execSync("git log -1 --format=%cI").toString().trim();
  } catch {
    return "";
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_LAST_COMMIT_DATE: getLastCommitDate(),
  },
};

export default nextConfig;
