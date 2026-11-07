import fs from "node:fs";
import path from "node:path";
import {
  achievements,
  certifications,
  education,
  experience,
  globalTeams,
  leadership,
  mentoring,
  milestones,
  philosophy,
  profile,
  projects,
  recruiterFaq,
  recruiterSnapshot,
  siteUrl,
  skills,
  usesStack,
} from "../src/lib/data";
import { getAllPosts, getPostBySlug } from "../src/lib/posts";
import { qualityMetrics, qualityStatement, qualityStudies } from "../src/lib/quality";

const OUT_DIR = path.join(process.cwd(), "public/data");
const POSTS_OUT_DIR = path.join(OUT_DIR, "posts");

function writeJson(filename: string, data: unknown) {
  fs.writeFileSync(path.join(OUT_DIR, filename), JSON.stringify(data, null, 2));
  console.log(`wrote public/data/${filename}`);
}

// Start clean so posts that were removed or turned back into drafts never linger in the export.
fs.rmSync(POSTS_OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(POSTS_OUT_DIR, { recursive: true });

writeJson("profile.json", { ...profile, siteUrl });
writeJson("experience.json", experience);
writeJson("projects.json", projects);
writeJson("skills.json", { skills, usesStack });
writeJson("about.json", { milestones, philosophy, leadership, education, certifications, achievements });
writeJson("hiring.json", { ...recruiterSnapshot, location: profile.location, globalTeams, faq: recruiterFaq });
writeJson("quality.json", {
  statement: qualityStatement,
  metrics: qualityMetrics,
  caseStudies: qualityStudies.map((study) => ({ ...study, url: `${siteUrl}/quality/${study.slug}` })),
});
writeJson("mentoring.json", { ...mentoring, pageUrl: `${siteUrl}/mentoring` });

const postsMeta = getAllPosts();
writeJson("posts.json", postsMeta);

for (const meta of postsMeta) {
  const post = getPostBySlug(meta.slug);
  if (!post) continue;
  fs.writeFileSync(path.join(POSTS_OUT_DIR, `${meta.slug}.json`), JSON.stringify(post, null, 2));
  console.log(`wrote public/data/posts/${meta.slug}.json`);
}

console.log(`\nExported data for MCP server consumption to public/data/`);
