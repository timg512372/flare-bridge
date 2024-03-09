export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Flare",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Account",
      href: "/",
    },
    {
      title: "Bridge",
      href: "/",
    },
    {
      title: "Staking",
      href: "/",
    },
    {
      title: "Voting",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
