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
          "If you've never scheduled a junk removal pickup before, it's natural to wonder whether a company can simply take everything sitting in your garage. In most cases, yes — [furniture](/services/furniture-removal), [appliances](/services/appliance-removal), electronics, mattresses, [yard waste](/services/yard-waste-removal), and general clutter are all standard. But a small category of items falls outside what a hauling crew is legally allowed to take, for the same reason your regular trash pickup won't take them either.",
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
          "The easiest way to avoid a surprise on pickup day is to send a photo of anything you're unsure about before your appointment. A reputable junk removal company would rather answer that question in advance than show up to a job they can't legally complete. You can attach photos directly to our [instant quote form](/quote), and we'll tell you what we can and can't take before anything is scheduled — along with [what the job will cost](/pricing).",
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
          "Most junk removal pricing — including estate cleanouts — is based on how much space your items take up in the truck, not a flat per-room fee. A single cluttered room can sometimes cost more to clear than a mostly-empty house with a few large items. Our [published price ranges by load size](/pricing) show how that scales, from a quarter truck up to a full one.",
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
          "The most reliable way to get a real number is a walkthrough — in person or over photos/video — rather than a phone estimate based on square footage alone. A company that gives you a firm, upfront price before the crew starts loading anything is the right kind of company to work with for something as significant as an estate cleanout. Here's [how we handle estate cleanouts](/services/estate-cleanouts), and you can [start a quote with photos](/quote) whenever you're ready.",
        ],
      },
    ],
  },
  {
    slug: "how-to-get-rid-of-a-couch",
    title: "How to Get Rid of an Old Couch in Boise",
    metaTitle: "How to Get Rid of an Old Couch in Boise",
    metaDescription:
      "Five ways to get rid of an old couch in Boise — curbside pickup, donation, the landfill, selling it, or hauling. What each one costs you in money and time.",
    updated: "2026-08-18",
    excerpt:
      "A couch is too big for the trash, too worn to sell, and too heavy to carry alone. Here are your five real options in the Treasure Valley.",
    body: [
      {
        paragraphs: [
          "An old couch is the single most common thing people call us about, and it's easy to see why. It's too big for your trash bin, too heavy to move by yourself, and often too worn for a donation center to accept. It ends up sitting in a garage or spare room for months while you figure out what to do with it. Here are the five options that actually exist in Boise, and the honest tradeoff on each.",
        ],
      },
      {
        heading: "1. Your city's bulk waste pickup",
        paragraphs: [
          "Most Treasure Valley cities run some form of bulky item collection through their residential trash service, usually a limited number of pickups per year that you schedule in advance. It's the cheapest route if you qualify. The catches are timing and placement — you're waiting for the next available date, and the couch has to make it to the curb, which is the hard part if it's on a second floor or in a basement.",
        ],
      },
      {
        heading: "2. Donate it (if it's genuinely in good shape)",
        paragraphs: [
          "Local charities will take a couch that's clean, structurally sound, free of tears and stains, and — this is the one that surprises people — free of pet odor and any sign of bed bugs. Many will pick up larger furniture for free. Call first and describe the condition honestly, because a rejected donation pickup puts you right back where you started, except now it's a week later.",
        ],
      },
      {
        heading: "3. Sell it or give it away",
        paragraphs: [
          "Facebook Marketplace and the local buy-nothing groups move furniture fast when it's in decent shape, and the buyer usually handles loading. The tradeoff is your time: fielding messages, scheduling, and no-shows. For a couch worth under about $100, most people find the hassle costs more than the couch returns.",
        ],
      },
      {
        heading: "4. Haul it to the landfill yourself",
        paragraphs: [
          "If you've got a truck and a second person, you can take it to the Ada County Landfill on Seamans Gulch Road, or to Pickles Butte if you're on the Canyon County side. You'll pay a vehicle entry fee plus a charge by weight. Budget most of a morning for the drive, the queue, and the unloading — and be realistic about whether a sleeper sofa is going to come down your stairs with two people.",
        ],
      },
      {
        heading: "5. Have it hauled",
        paragraphs: [
          "This is what we do, and the reason people pick it is almost never the price alone — it's that the couch is upstairs and the stairs have a landing. A single-item pickup in the valley starts around $80, and that covers the crew carrying it out, the drive, and the disposal fee. You don't lift anything and you don't lose a Saturday.",
          "If you're weighing it up, our [furniture removal page](/services/furniture-removal) covers how we handle pieces that won't fit back through the door they came in, and the [pricing page](/pricing) shows what each load size runs. We do [furniture removal in Boise](/services/furniture-removal/boise-id) most days of the week.",
        ],
      },
      {
        heading: "What about a sofa bed?",
        paragraphs: [
          "Sleeper sofas deserve their own warning. The steel frame inside makes them dramatically heavier than they look — often 250 pounds or more — and donation centers rarely accept them. They're also the piece most likely to have come into the room before a railing was added or a doorway was narrowed. If you're moving one down stairs, don't try it with two people and good intentions.",
        ],
      },
    ],
  },
  {
    slug: "mattress-disposal-boise",
    title: "How to Dispose of a Mattress in Boise",
    metaTitle: "How to Dispose of a Mattress in Boise",
    metaDescription:
      "Mattresses can't go in the trash and most donation centers won't take them. Here's how to legally get rid of an old mattress in the Treasure Valley.",
    updated: "2026-08-18",
    excerpt:
      "Mattresses are the item nobody will take — not your trash service, not the thrift store. Here's what actually works in the Treasure Valley.",
    body: [
      {
        paragraphs: [
          "Mattresses are uniquely annoying to get rid of. They don't fit in a residential bin, most thrift stores won't accept them for health reasons, and they're awkward enough that one person genuinely can't manage a king down a flight of stairs. If you just bought a new bed and the old one is leaning against a wall in the garage, here's how to actually move it along.",
        ],
      },
      {
        heading: "Why donation usually isn't an option",
        paragraphs: [
          "Most charities in the Treasure Valley won't take used mattresses, and it isn't about condition — it's liability and health regulation around bed bugs and sanitation. A few specialty programs accept them, but assume the answer is no unless you've called and confirmed. This is the step people burn a week on, so it's worth doing first.",
        ],
      },
      {
        heading: "Check whether your retailer will take the old one",
        paragraphs: [
          "If you're replacing the mattress, ask the store about haul-away when you buy. Many mattress retailers will remove your old one on delivery for a modest fee or as part of a package, and it's almost always cheaper than arranging it separately afterward. Ask before delivery day — most won't do it as an add-on once the truck is already at your house.",
        ],
      },
      {
        heading: "Taking it to the landfill",
        paragraphs: [
          "You can take a mattress to the Ada County Landfill on Seamans Gulch Road, or to Pickles Butte south of Nampa if you're in Canyon County. You'll pay the standard vehicle entry and per-weight charges. Bring rope or straps and a second person — a mattress that catches wind on the connector at highway speed is a genuine hazard, and an unsecured load can get you cited.",
        ],
      },
      {
        heading: "Recycling",
        paragraphs: [
          "Mattresses are actually quite recyclable when they're broken down — the steel springs, foam, and wood frame all have separate streams. Facilities that do this aren't in every market, so it's worth a search for current mattress recycling options near you before assuming the landfill is the only destination.",
        ],
      },
      {
        heading: "Having it picked up",
        paragraphs: [
          "We haul mattresses constantly, and one thing worth saying plainly: we don't charge a mattress surcharge. Ada County doesn't levy a separate mattress fee, so a mattress is priced as the space it takes up and nothing more — some companies add $30 or more per mattress on top. A single mattress pickup falls in our minimum-charge range, and it covers us carrying it out of whatever room it's in.",
          "See our [furniture and mattress removal service](/services/furniture-removal) for details, or [check the price ranges](/pricing) by load size. If you've got a bed frame, box spring, and mattress together, that's typically still well under a quarter-truck load.",
        ],
      },
    ],
  },
  {
    slug: "dumpster-rental-vs-junk-removal",
    title: "Dumpster Rental vs. Junk Removal: Which Is Cheaper?",
    metaTitle: "Dumpster Rental vs. Junk Removal: Which Is Cheaper?",
    metaDescription:
      "An honest comparison of renting a dumpster versus hiring junk removal in the Treasure Valley — cost, timeline, labor, and which one fits your project.",
    updated: "2026-08-18",
    excerpt:
      "One is cheaper on paper. The other is cheaper once you count your own weekend. Here's how to tell which fits your job.",
    body: [
      {
        paragraphs: [
          "If you're clearing out a house or finishing a remodel, you've probably priced both a dumpster rental and a junk removal crew and found they're not far apart. They solve the problem differently, though, and the right answer depends less on price than on who's doing the lifting and how long the job runs.",
        ],
      },
      {
        heading: "The real cost difference",
        paragraphs: [
          "A dumpster rental is priced by container size and rental period, typically including a weight allowance with overage charged per ton. Junk removal is priced by the volume your items actually occupy in the truck. The important distinction: with a dumpster you pay for the container whether you fill it or not, and with junk removal you pay for what you actually have.",
          "For a half-truck load — a normal garage cleanout — our [published ranges](/pricing) put that in the low hundreds. A dumpster for the same volume often lands in a similar range once you add delivery and pickup, but only if you fill it efficiently.",
        ],
      },
      {
        heading: "Who does the loading",
        paragraphs: [
          "This is the fork in the road, and it's worth being blunt about it. With a dumpster, you carry every item out of the house yourself, over however many days you have it. With junk removal, a crew does that in a couple of hours while you point at things. If the job involves a basement, a second floor, or a hot tub, that difference is not a small one.",
        ],
      },
      {
        heading: "How long the project runs",
        paragraphs: [
          "Dumpsters win on long projects. If you're gutting a kitchen over three weeks and generating debris the whole time, having a container sitting in the driveway is genuinely more practical than scheduling six pickups. Junk removal wins when the pile already exists and you want it gone today.",
          "There's a middle path that a lot of contractors use: no dumpster, but a hauling crew that swings through at framing, drywall, and finish stages. Our [construction debris removal](/services/construction-debris) is set up for exactly that.",
        ],
      },
      {
        heading: "Permits, driveways, and HOAs",
        paragraphs: [
          "A dumpster on the street usually requires a permit from the city, and one in your driveway can crack the concrete under a heavy load. Newer Treasure Valley subdivisions frequently have HOA rules about how long a container can sit visible. None of that applies to a truck that shows up and leaves the same morning — worth weighing if you're in Meridian, Kuna, or Star, where the HOAs tend to be active.",
        ],
      },
      {
        heading: "The short version",
        paragraphs: [
          "Rent a dumpster if you have a long project, a steady trickle of debris, the ability to load it yourself, and somewhere legal to put it. Hire junk removal if the pile already exists, the items are heavy or awkward, you'd rather not spend a weekend on it, or you need it cleared before a specific date — a closing, a move-out, or a [rental turnover](/services/rental-property-cleanouts).",
          "Not sure which side you fall on? [Send us photos](/quote) and we'll give you a real number to compare against a dumpster quote. If a dumpster is genuinely the better call for your job, we'll tell you.",
        ],
      },
    ],
  },
  {
    slug: "how-to-prepare-for-junk-removal",
    title: "How to Prepare for a Junk Removal Pickup",
    metaTitle: "How to Prepare for a Junk Removal Pickup",
    metaDescription:
      "Six things to do before the truck arrives so your junk removal appointment is faster, cheaper, and free of surprises.",
    updated: "2026-08-18",
    excerpt:
      "A few minutes of prep keeps your appointment on schedule and your quote accurate. Here's what actually helps — and what doesn't.",
    body: [
      {
        paragraphs: [
          "You don't need to do much before a junk removal crew shows up — carrying things out is the service, not your job. But a handful of small things genuinely make the appointment faster and keep the final price matching the quote. Here's what's worth doing.",
        ],
      },
      {
        heading: "1. Separate what's staying",
        paragraphs: [
          "This is the one that matters most. Crews work fast, and the single worst outcome of a pickup is something leaving that wasn't supposed to. Move the keepers to another room if you can, or mark them clearly with tape or a sticky note and walk the crew through the space before they start.",
        ],
      },
      {
        heading: "2. Take photos before you book",
        paragraphs: [
          "A photo from a few steps back — far enough to show the whole pile — gets you a far more accurate quote than a description does. People consistently underestimate volume by about a third when describing it in words. Our [instant quote form](/quote) takes photos directly and sizes the load from them.",
        ],
      },
      {
        heading: "3. Flag the access issues up front",
        paragraphs: [
          "Stairs, narrow gates, a basement, a long driveway, a locked complex, an HOA that restricts truck parking, a building with a reserved freight elevator window. None of these cost extra, but all of them change how many people we send and how long we block out. Mentioning them when you book is the difference between a smooth job and a rescheduled one.",
        ],
      },
      {
        heading: "4. Pull out the things we can't take",
        paragraphs: [
          "Paint, solvents, pesticides, pool chemicals, and other hazardous materials need a household hazardous waste facility, not a hauling truck. Setting those aside in advance means the crew isn't sorting through a pile mid-job. Our guide on [what junk removal companies can't take](/resources/what-junk-removal-cant-take) has the full list.",
        ],
      },
      {
        heading: "5. Empty and defrost appliances",
        paragraphs: [
          "If a refrigerator or freezer is going, empty it and let it defrost beforehand if you can. A unit full of standing meltwater is heavier, messier, and drips across your floor on the way out. See our [appliance removal page](/services/appliance-removal) for what we handle on hookups — standard water lines and outlets we can disconnect on the spot, gas lines need a licensed technician first.",
        ],
      },
      {
        heading: "6. Clear a path to the truck",
        paragraphs: [
          "Move cars out of the driveway and get bikes, planters, and garden hoses out of the walkway. Five minutes here saves the crew twenty, and on a volume-priced job a faster load is genuinely in your interest.",
        ],
      },
      {
        heading: "What you don't need to do",
        paragraphs: [
          "You don't need to move anything to the curb, break furniture down, bag loose items, or be strong enough to help. You often don't even need to be home — as long as the items are accessible and we've confirmed what's going in advance, plenty of jobs get done with a lockbox code and a confirmation photo afterward. That's standard for [rental turnovers](/services/rental-property-cleanouts) and out-of-town estate work.",
        ],
      },
    ],
  },
];
