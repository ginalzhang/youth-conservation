import siteSettingsData from "../../content/settings/site.json";
import homePageData from "../../content/pages/home.json";
import workPageData from "../../content/pages/what-we-do.json";
import teamPageData from "../../content/pages/team.json";
import getInvolvedPageData from "../../content/pages/get-involved.json";
import startChapterPageData from "../../content/pages/start-a-chapter.json";
import contactPageData from "../../content/pages/contact.json";

export type Link = {
  label: string;
  href: string;
};

export type TeamMember = {
  name: string;
  role: string;
  photo?: string;
  photoAlt?: string;
  bio?: string;
  sortOrder?: number;
  visible?: boolean;
};

export const siteSettings = siteSettingsData;
export const homePage = homePageData;
export const workPage = workPageData;
export const teamPage = teamPageData;
export const getInvolvedPage = getInvolvedPageData;
export const startChapterPage = startChapterPageData;
export const contactPage = contactPageData;

const teamMemberModules = import.meta.glob("../../content/team-members/*.json", { eager: true });

export function toPublicPath(path?: string | null) {
  if (!path) return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function getVisibleTeamMembers(): TeamMember[] {
  return Object.values(teamMemberModules)
    .map((module) => (module as { default: TeamMember }).default)
    .filter((member) => member.visible !== false && member.name && member.name !== "Name")
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}
