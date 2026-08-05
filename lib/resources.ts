export type ResourcePost = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  updated: string;
  excerpt: string;
  body: Array<{ heading?: string; paragraphs: string[] }>;
};

export const RESOURCES: ResourcePost[] = [
  {
    slug: "what-junk-removal-cant-take",
    title: "What Items Can't a Junk Removal Company Take?",
    metaTitle: "What Items Can't Junk Removal Companies Take?",
    metaDescription:
      "A clear breakdown of what most junk removal companies — including Boise Basin — can't legally haul, and what to do with those items instead.",
    updated: "2026-08-05",
    excerpt:
      "Most furniture, appliances, and general clutter is fair game — but hazardous and regulated materials need a different disposal path. Here's what to expect.",
    body: [
      {
        paragraphs: [
          "If you've never scheduled a junk removal pickup before, it's natural to wonder whether a company can simply take everything sitting in your garage. In most cases, yes — furniture, appliances, electronics, mattresses, yard waste, and general clutter are all standard. But a small category of items falls outside what a hauling crew is legally allowed to take, for the same reason your regular trash pickup won't take them either.",
        ],
      },
      {
        heading: "Hazardous and chemical materials",
        paragraphs: [
          "Paint, solvents, pesticides, pool chemicals, and other hazardous liquids typically can't go in a standard junk removal load. Most counties operate a household hazardous waste facility specifically for these items — a quick search for \"household hazardous waste\" plus your county name will usually turn up drop-off hours and accepted materials.",
        ],
      },
      {
        heading: "Asbestos and biohazard materials",
        paragraphs: [
          "Asbestos-containing materials (common in older insulation, tile, or siding) and biohazard waste require licensed abatement or remediation specialists, not a general hauling crew. If you're unsure whether something in an older home falls into this category, it's worth asking a professional before scheduling removal.",
        ],
      },
      {
        heading: "When in doubt, ask first",
        paragraphs: [
          "The easiest way to avoid a surprise on pickup day is to send a photo of anything you're unsure about before your appointment. A reputable junk removal company would rather answer that question in advance than show up to a job they can't legally complete.",
        ],
      },
    ],
  },
  {
    slug: "estate-cleanout-cost-guide",
    title: "How Much Does an Estate Cleanout Cost?",
    metaTitle: "How Much Does an Estate Cleanout Cost?",
    metaDescription:
      "What actually drives estate cleanout pricing — volume, access, and item type — so you know what to expect before you request a quote.",
    updated: "2026-08-05",
    excerpt:
      "Estate cleanout pricing isn't a flat rate — it depends on volume, access, and what's actually in the home. Here's what drives the number.",
    body: [
      {
        paragraphs: [
          "Estate cleanouts are one of the harder quotes to estimate sight-unseen, because \"clear out the whole house\" can mean anything from a tidy one-bedroom condo to a full multi-generational home with a garage, shed, and attic included. That said, the same few factors drive pricing across almost every estate cleanout.",
        ],
      },
      {
        heading: "Volume is the biggest factor",
        paragraphs: [
          "Most junk removal pricing — including estate cleanouts — is based on how much space your items take up in the truck, not a flat per-room fee. A single cluttered room can sometimes cost more to clear than a mostly-empty house with a few large items.",
        ],
      },
      {
        heading: "Access and property layout matter",
        paragraphs: [
          "Stairs, narrow hallways, long driveways, and multiple buildings on a property (a house plus a shed or garage) all add labor time, which factors into the final price. A single-story home with a direct path to the driveway is generally faster and less expensive to clear than a multi-story home with a detached garage.",
        ],
      },
      {
        heading: "What's actually being removed",
        paragraphs: [
          "Bulky furniture, appliances, and anything requiring careful handling (glass, antiques being set aside, large mirrors) can affect labor time even at the same volume. Sorting instructions — donate this, keep that, dispose of the rest — also add time compared to a straightforward full clear-out.",
        ],
      },
      {
        heading: "Getting an accurate quote",
        paragraphs: [
          "The most reliable way to get a real number is a walkthrough — in person or over photos/video — rather than a phone estimate based on square footage alone. A company that gives you a firm, upfront price before the crew starts loading anything is the right kind of company to work with for something as significant as an estate cleanout.",
        ],
      },
    ],
  },
];
