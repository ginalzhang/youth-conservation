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
        name: "teamPage",
        label: "Team Page",
        path: "content/pages",
        format: "json",
        match: { include: "team" },
        ui: singleDocumentActions,
        fields: [
          ...pageShellFields,
          { type: "object", name: "header", label: "Header", fields: headerFields },
          {
            type: "object",
            name: "placeholder",
            label: "Empty team placeholder",
            fields: [
              { type: "string", name: "photoLabel", label: "Photo label", required: true },
              { type: "string", name: "roleLabel", label: "Role label", required: true },
              { type: "string", name: "nameLabel", label: "Name label", required: true },
              { type: "number", name: "count", label: "Placeholder count", required: true },
              { type: "string", name: "note", label: "Note", ui: { component: "textarea" }, required: true }
            ]
          }
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
          { type: "object", name: "cards", label: "Cards", list: true, fields: cardFields },
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
