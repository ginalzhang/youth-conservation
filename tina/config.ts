import { defineConfig, type TinaField } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const ctaFields: TinaField[] = [
  { type: "string", name: "label", label: "Label", required: true },
  { type: "string", name: "href", label: "Link", required: true }
];

const headerFields: TinaField[] = [
  { type: "string", name: "eyebrow", label: "Eyebrow", required: true },
  { type: "string", name: "heading", label: "Heading", required: true },
  { type: "string", name: "body", label: "Body", ui: { component: "textarea" }, required: true }
];

const cardFields: TinaField[] = [
  { type: "string", name: "kicker", label: "Kicker", required: true },
  { type: "string", name: "heading", label: "Heading", required: true },
  { type: "string", name: "body", label: "Body", ui: { component: "textarea" }, required: true }
];

const involvementCardFields: TinaField[] = [
  ...cardFields,
  { type: "string", name: "linkLabel", label: "Link label" },
  { type: "string", name: "linkHref", label: "Link URL" },
  { type: "boolean", name: "newTab", label: "Open link in new tab" }
];

const problemBlockFields: TinaField[] = [
  { type: "string", name: "eyebrow", label: "Eyebrow", required: true },
  { type: "string", name: "heading", label: "Heading", required: true },
  { type: "string", name: "body", label: "Body slot", ui: { component: "textarea" }, required: true },
  { type: "string", name: "sourceLabel", label: "Source label", required: true },
  { type: "string", name: "sourceHref", label: "Source URL", required: true },
  { type: "string", name: "imagePlaceholder", label: "Image placeholder", required: true }
];

const pageShellFields: TinaField[] = [
  { type: "string", name: "title", label: "SEO title", required: true },
  { type: "string", name: "description", label: "SEO description", ui: { component: "textarea" }, required: true }
];

const singleDocumentActions = {
  allowedActions: {
    create: false,
    delete: false,
    createFolder: false
  }
};

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
      static: false
    }
  },
  schema: {
    collections: [
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        match: { include: "site" },
        ui: singleDocumentActions,
        fields: [
          { type: "string", name: "siteName", label: "Site name", required: true },
          {
            type: "string",
            name: "defaultDescription",
            label: "Default SEO description",
            ui: { component: "textarea" },
            required: true
          },
          { type: "string", name: "contactEmail", label: "Contact email", required: true },
          { type: "string", name: "instagramUrl", label: "Instagram URL", required: true },
          { type: "string", name: "instagramLabel", label: "Instagram label", required: true },
          { type: "string", name: "locationText", label: "Location text", required: true },
          {
            type: "object",
            name: "navItems",
            label: "Navigation",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "Link", required: true },
              { type: "boolean", name: "cta", label: "CTA style" }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" }, required: true },
              { type: "string", name: "pagesHeading", label: "Pages heading", required: true },
              { type: "string", name: "contactHeading", label: "Contact heading", required: true },
              { type: "string", name: "note", label: "Footer note", required: true },
              { type: "string", name: "adminLabel", label: "Admin link label", required: true }
            ]
          }
        ]
      },
      {
        name: "homePage",
        label: "Home Page",
        path: "content/pages",
        format: "json",
        match: { include: "home" },
        ui: singleDocumentActions,
        fields: [
          ...pageShellFields,
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow", required: true },
              { type: "string", name: "heading", label: "Heading", required: true },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" }, required: true },
              { type: "object", name: "primaryCta", label: "Primary CTA", fields: ctaFields },
              { type: "object", name: "secondaryCta", label: "Secondary CTA", fields: ctaFields }
            ]
          },
          {
            type: "object",
            name: "highlights",
            label: "Highlights",
            fields: [
              { type: "string", name: "heading", label: "Heading", required: true },
              {
                type: "object",
                name: "items",
                label: "Items",
                list: true,
                fields: [
                  { type: "string", name: "value", label: "Value", required: true },
                  { type: "string", name: "label", label: "Label", ui: { component: "textarea" }, required: true }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "whoWeAre",
            label: "Who We Are",
            fields: [
              ...headerFields,
              { type: "string", name: "linkLabel", label: "Link label", required: true },
              { type: "string", name: "linkHref", label: "Link URL", required: true },
              { type: "image", name: "photo", label: "Photo" },
              { type: "string", name: "photoAlt", label: "Photo alt text" },
              { type: "string", name: "photoPlaceholder", label: "Photo placeholder", required: true }
            ]
          },
          {
            type: "object",
            name: "workSummary",
            label: "Work Summary",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow", required: true },
              { type: "string", name: "heading", label: "Heading", required: true },
              { type: "object", name: "cards", label: "Cards", list: true, fields: cardFields }
            ]
          },
          {
            type: "object",
            name: "ask",
            label: "Question CTA",
            fields: [
              ...headerFields,
              { type: "object", name: "cta", label: "CTA", fields: ctaFields }
            ]
          }
        ]
      },
      {
        name: "workPage",
        label: "What We Do Page",
        path: "content/pages",
        format: "json",
        match: { include: "what-we-do" },
        ui: singleDocumentActions,
        fields: [
          ...pageShellFields,
          { type: "object", name: "header", label: "Header", fields: headerFields },
          { type: "object", name: "workItems", label: "Work items", list: true, fields: cardFields },
          {
            type: "object",
            name: "socialFeed",
            label: "Social Feed",
            fields: [
              ...headerFields,
              { type: "image", name: "image", label: "Image", required: true },
              { type: "string", name: "imageAlt", label: "Image alt text", required: true },
              { type: "string", name: "linkLabel", label: "Link label", required: true },
              { type: "string", name: "linkHref", label: "Link URL", required: true }
            ]
          }
        ]
      },
      {
        name: "problemPage",
        label: "The Problem Page",
        path: "content/pages",
        format: "json",
        match: { include: "the-problem" },
        ui: singleDocumentActions,
        fields: [
          ...pageShellFields,
          {
            type: "object",
            name: "header",
            label: "Header",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow", required: true },
              { type: "string", name: "heading", label: "Heading", required: true }
            ]
          },
          {
            type: "object",
            name: "thesis",
            label: "Thesis",
            fields: [
              { type: "string", name: "heading", label: "Headline statement", required: true },
              { type: "string", name: "lede", label: "Lede slot", ui: { component: "textarea" }, required: true },
              { type: "string", name: "body", label: "Body slot", ui: { component: "textarea" }, required: true }
            ]
          },
          { type: "object", name: "blockOne", label: "Block 1 - Climate issues", fields: problemBlockFields },
          {
            type: "object",
            name: "blockTwo",
            label: "Block 2 - Local impact",
            fields: [
              ...problemBlockFields,
              { type: "string", name: "findings", label: "Findings", list: true, required: true }
            ]
          },
          { type: "object", name: "blockThree", label: "Block 3 - Climate literacy", fields: problemBlockFields },
          {
            type: "object",
            name: "blockFour",
            label: "Block 4 - Mission",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow", required: true },
              { type: "string", name: "heading", label: "Heading", required: true },
              { type: "string", name: "paragraphs", label: "Paragraph slots", list: true, ui: { component: "textarea" }, required: true }
            ]
          },
          {
            type: "object",
            name: "learnMore",
            label: "Learn More",
            fields: [
              { type: "string", name: "heading", label: "Heading", required: true },
              { type: "object", name: "links", label: "Links", list: true, fields: ctaFields }
            ]
          },
          {
            type: "object",
            name: "cta",
            label: "CTA",
            fields: [
              { type: "string", name: "heading", label: "Heading", required: true },
              { type: "string", name: "label", label: "Button label", required: true },
              { type: "string", name: "href", label: "Button link", required: true }
            ]
          }
        ]
      },
      {
        name: "teamPage",
        label: "Team Page",
        path: "content/pages",
        format: "json",
        match: { include: "team" },
        ui: singleDocumentActions,
        fields: [
          ...pageShellFields,
          { type: "object", name: "header", label: "Header", fields: headerFields }
        ]
      },
      {
        name: "teamMember",
        label: "Team Members",
        path: "content/team-members",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => String(values.name || "team-member").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          { type: "string", name: "name", label: "Name", required: true },
          { type: "string", name: "role", label: "Role", required: true },
          { type: "image", name: "photo", label: "Photo" },
          { type: "string", name: "photoAlt", label: "Photo alt text", required: true },
          { type: "string", name: "bio", label: "Bio", ui: { component: "textarea" } },
          { type: "number", name: "sortOrder", label: "Sort order" },
          { type: "boolean", name: "visible", label: "Show on website" }
        ]
      },
      {
        name: "getInvolvedPage",
        label: "Get Involved Page",
        path: "content/pages",
        format: "json",
        match: { include: "get-involved" },
        ui: singleDocumentActions,
        fields: [
          ...pageShellFields,
          { type: "object", name: "header", label: "Header", fields: headerFields },
          { type: "object", name: "cards", label: "Cards", list: true, fields: involvementCardFields },
          {
            type: "object",
            name: "collaboration",
            label: "Collaboration CTA",
            fields: [
              ...headerFields,
              { type: "object", name: "cta", label: "CTA", fields: ctaFields }
            ]
          }
        ]
      },
      {
        name: "startChapterPage",
        label: "Start a Chapter Page",
        path: "content/pages",
        format: "json",
        match: { include: "start-a-chapter" },
        ui: singleDocumentActions,
        fields: [
          ...pageShellFields,
          { type: "object", name: "header", label: "Header", fields: headerFields },
          { type: "object", name: "intro", label: "Intro", fields: headerFields },
          { type: "object", name: "details", label: "Details", list: true, fields: cardFields },
          {
            type: "object",
            name: "formCta",
            label: "Form CTA",
            fields: [
              ...headerFields,
              { type: "object", name: "cta", label: "CTA", fields: ctaFields }
            ]
          }
        ]
      },
      {
        name: "contactPage",
        label: "Contact Page",
        path: "content/pages",
        format: "json",
        match: { include: "contact" },
        ui: singleDocumentActions,
        fields: [
          ...pageShellFields,
          { type: "object", name: "header", label: "Header", fields: headerFields },
          {
            type: "object",
            name: "success",
            label: "Success message",
            fields: [
              { type: "string", name: "heading", label: "Heading", required: true },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" }, required: true },
              { type: "string", name: "resetLabel", label: "Reset label", required: true }
            ]
          },
          {
            type: "object",
            name: "form",
            label: "Form",
            fields: [
              { type: "string", name: "nameLabel", label: "Name label", required: true },
              { type: "string", name: "emailLabel", label: "Email label", required: true },
              { type: "string", name: "topicLabel", label: "Topic label", required: true },
              { type: "string", name: "topics", label: "Topics", list: true, required: true },
              { type: "string", name: "messageLabel", label: "Message label", required: true },
              { type: "string", name: "submitLabel", label: "Submit label", required: true },
              { type: "string", name: "note", label: "Note", ui: { component: "textarea" }, required: true }
            ]
          },
          {
            type: "object",
            name: "sidebar",
            label: "Sidebar",
            fields: [
              { type: "string", name: "heading", label: "Heading", required: true },
              { type: "string", name: "locationHeading", label: "Location heading", required: true },
              { type: "string", name: "locationBody", label: "Location body", ui: { component: "textarea" }, required: true }
            ]
          }
        ]
      }
    ]
  }
});
