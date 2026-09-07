import type { ComponentType, SVGProps } from "react";
import {
  SiApachejmeter,
  SiAppium,
  SiBitbucket,
  SiClaudecode,
  SiCplusplus,
  SiCucumber,
  SiCursor,
  SiCypress,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiGithubcopilot,
  SiJavascript,
  SiJenkins,
  SiJira,
  SiMongodb,
  SiMysql,
  SiOpenjdk,
  SiPostgresql,
  SiRedis,
  SiSelenium,
  SiSentry,
  SiTestrail,
  SiTypescript,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { PlaywrightIcon } from "@/components/BrandIcons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type SkillIcon = { Icon: IconComponent; color: string };

/**
 * Real, verified brand icons only — no invented logos. Items not listed here
 * (methodologies like "UI Testing", or tools with no available/reliable brand
 * mark, e.g. Azure DevOps, TestNG, REST Assured, MCP Server, ChatGPT) render
 * as plain text, matched against @/lib/data's exact skill item strings.
 */
export const SKILL_ICONS: Record<string, SkillIcon> = {
  Java: { Icon: SiOpenjdk, color: "#000000" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  "C++": { Icon: SiCplusplus, color: "#00599C" },

  Playwright: { Icon: PlaywrightIcon, color: "" },
  Selenium: { Icon: SiSelenium, color: "#43B02A" },
  Cypress: { Icon: SiCypress, color: "#69D3A7" },
  Appium: { Icon: SiAppium, color: "#EE376D" },
  Cucumber: { Icon: SiCucumber, color: "#23D96C" },

  "GitHub Actions": { Icon: SiGithubactions, color: "#2088FF" },
  Jenkins: { Icon: SiJenkins, color: "#D24939" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  AWS: { Icon: FaAws, color: "#FF9900" },

  MySQL: { Icon: SiMysql, color: "#4479A1" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Redis: { Icon: SiRedis, color: "#FF4438" },
  Sentry: { Icon: SiSentry, color: "#362D59" },

  Git: { Icon: SiGit, color: "#F03C2E" },
  Bitbucket: { Icon: SiBitbucket, color: "#0052CC" },
  Jira: { Icon: SiJira, color: "#0052CC" },
  TestRail: { Icon: SiTestrail, color: "#65C179" },

  "Claude Code": { Icon: SiClaudecode, color: "#D97757" },
  Cursor: { Icon: SiCursor, color: "#000000" },
  "GitHub Copilot": { Icon: SiGithubcopilot, color: "#000000" },

  "Performance (JMeter)": { Icon: SiApachejmeter, color: "#D22128" },
};
