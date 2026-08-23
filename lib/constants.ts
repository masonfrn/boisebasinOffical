// The live domain. Everything canonical derives from this — canonical tags,
// og:url, LocalBusiness schema, sitemap.xml, robots.txt — so it has to match
// where the site actually answers. The bare domain 308s to www, making www the
// canonical form. (This read boisebasinjunkremoval.com until 2026-08-14, a
// domain that never resolved, which pointed every crawler at nothing.)
export const SITE_URL = "https://www.boisebasinjunk.com";

export const BUSINESS = {
  name: "Boise Basin Junk Removal",
  shortName: "Boise Basin",
  phone: "(208) 391-3730",
  phoneHref: "tel:+12083913730",
  smsHref: "sms:+12083913730",
  email: "boisebasinjunkremoval@gmail.com",
  emailHref: "mailto:boisebasinjunkremoval@gmail.com",
  facebookUrl: "https://www.facebook.com/profile.php?id=61591435949353",
  googleReviewUrl: "https://g.page/r/CV8ZAV7JDmDwEAI/review",
  serviceRegion: "Treasure Valley, Idaho",
  addressRegion: "ID",
  addressLocality: "Boise",
  // Boise general city center — used as the service-area center for
  // LocalBusiness geo in schema (no public storefront address).
  geo: { latitude: 43.615, longitude: -116.2023 },
};

export const BUSINESS_HOURS = [
  { day: "Monday", opens: "08:00", closes: "21:00" },
  { day: "Tuesday", opens: "08:00", closes: "21:00" },
  { day: "Wednesday", opens: "08:00", closes: "21:00" },
  { day: "Thursday", opens: "08:00", closes: "21:00" },
  { day: "Friday", opens: "08:00", closes: "21:00" },
  { day: "Saturday", opens: "08:00", closes: "21:00" },
];

export const SERVICE_AREAS = [
  "Boise",
  "Meridian",
  "Eagle",
  "Nampa",
  "Caldwell",
  "Kuna",
  "Star",
  "Middleton",
];

export const ITEM_TYPES = [
  "Furniture",
  "Appliances",
  "Mattress",
  "Yard Waste",
  "Construction Debris",
  "Garage Cleanout",
  "Estate Cleanout",
  "Storage Unit",
  "Hot Tub",
  "Electronics",
  "Other",
];

export const LOAD_SIZES = [
  { label: "Single Item", fill: 8 },
  { label: "Pickup Load", fill: 20 },
  { label: "Quarter Truck", fill: 25 },
  { label: "Half Truck", fill: 50 },
  { label: "Three-Quarter Truck", fill: 75 },
  { label: "Full Truck", fill: 100 },
  { label: "Multiple Loads", fill: 100 },
];

// `slug` ties each card to its SERVICE_PAGES entry, which is what makes the
// service grids linkable — on a city page each card points at the matching
// service-in-that-city page rather than the generic valley-wide one.
export const SERVICES = [
  { slug: "furniture-removal", title: "Furniture Removal", desc: "Couches, mattresses, tables, and anything else taking up space." },
  { slug: "appliance-removal", title: "Appliance Removal", desc: "Fridges, washers, dryers, and other bulky appliances hauled safely." },
  { slug: "garage-cleanouts", title: "Garage Cleanouts", desc: "Reclaim your garage from years of accumulated clutter." },
  { slug: "estate-cleanouts", title: "Estate Cleanouts", desc: "Respectful, efficient cleanouts during a difficult transition." },
  { slug: "construction-debris", title: "Construction Debris", desc: "Scrap wood, drywall, and remodel leftovers cleared fast." },
  { slug: "yard-waste-removal", title: "Yard Waste", desc: "Branches, dirt, old fencing, and landscaping debris removed." },
  { slug: "storage-unit-cleanouts", title: "Storage Units", desc: "Full unit cleanouts so you can close it out and move on." },
  { slug: "rental-property-cleanouts", title: "Rental Property Cleanouts", desc: "Fast turnarounds between tenants, coordinated with landlords." },
  { slug: "office-cleanouts", title: "Office Cleanouts", desc: "Desks, electronics, and furniture removed with minimal disruption." },
  { slug: "hot-tub-removal", title: "Hot Tub Removal", desc: "Heavy, awkward, and not a problem for our crew." },
];

export const FAQS = [
  {
    q: "How much does junk removal cost?",
    a: "Pricing is based on how much space your items take up in the truck, plus labor and disposal. Most single-item jobs start small, while full loads cost more. You'll get an upfront, no-obligation quote before we start.",
  },
  {
    q: "Do you offer same-day service?",
    a: "Yes. We offer same-day and next-day appointments across the Treasure Valley whenever our schedule allows, and we'll always tell you honestly if we can't make it work.",
  },
  {
    q: "What items can't you take?",
    a: "We're unable to take hazardous materials like paint, chemicals, asbestos, or biohazard waste. If you're not sure whether we can take something, send us a photo and we'll let you know.",
  },
  {
    q: "Do you recycle?",
    a: "Yes. We sort what we haul and donate or recycle as much as possible instead of sending it straight to the landfill.",
  },
  {
    q: "Do I need to be home?",
    a: "Not necessarily. As long as the items are accessible and we've confirmed details in advance, we can often complete the job without you present.",
  },
];

/**
 * Real Google reviews, reproduced verbatim — typos and all, because that's what
 * makes them read as real. Nothing goes in this array that a customer didn't
 * actually write.
 *
 * `location` is optional on purpose: a reviewer's city usually isn't public, and
 * a guessed one is a fabricated detail attached to a named person.
 */
export const TESTIMONIALS: Array<{
  name: string;
  location?: string;
  quote: string;
  rating: number;
  /**
   * Set only when the review describes a job we can actually identify as that
   * service — it surfaces the review on that service's page. Left off when the
   * review is general praise, rather than guessed at from wording.
   */
  serviceSlug?: string;
}> = [
  {
    name: "Kevin Shea",
    serviceSlug: "yard-waste-removal",
    quote:
      "Stone and Mason from Boise Basin Junk Removal were OUTSTANDING! I was clearing a planter by myself in the July heat and needed help. I got in touch with Stone and he was very helpful and understanding. Stone and Mason showed up later that same day and worked late. They worked hard and with minimal guidance needed. They are pleasant, friendly, and competent. They came back the next morning to help finish the job and to haul all the debris to the landfill. I was very pleased with their service and will definitely be using them again!",
    rating: 5,
  },
  {
    name: "Jason Morales",
    quote:
      "Great company. Showed up when they said and finished job when they said. When they were done it was like they were not even here. I would definitely recommend this company. They did a great job stuck to the quote and price was fair.",
    rating: 5,
  },
  {
    name: "Jackson Criner",
    quote:
      "These guys did a great job, showed up and showed professionalism through out the process. Loved working with them",
    rating: 5,
  },
  {
    name: "Kyan Newman",
    quote: "great guys ! they do it right. strong work ethic - moral compass !",
    rating: 5,
  },
  // Jack Smart's five-star review is deliberately absent: it's a rating with no
  // written text, so there's nothing to quote. It still counts toward the Google
  // rating — it just can't be a testimonial card.
];

export type CityPage = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  detail: string;
  highlights: string[];
  // County and disposal site drive the genuinely local detail on the 80
  // service-by-city pages. The Ada/Canyon split is the real operational
  // difference between jobs on either side of the valley — it decides which
  // facility a load goes to and how long the round trip takes.
  county: "Ada" | "Canyon";
  disposalSite: string;
};

export const CITY_PAGES: CityPage[] = [
  {
    slug: "boise-id",
    name: "Boise",
    metaTitle: "Junk Removal in Boise, ID",
    metaDescription:
      "Same-day junk removal in Boise, ID — furniture, appliances, garage and estate cleanouts. Licensed, insured, and locally owned. Get a free instant quote.",
    intro:
      "From North End bungalows to downtown condos and Boise Bench rentals, we clear out furniture, appliances, and years of accumulated clutter across the City of Trees.",
    detail:
      "Boise's mix of century-old homes and high-rise condos means every job is a little different — narrow staircases in the North End, tight loading zones downtown, or a full garage in the foothills. Our crew shows up with the right equipment either way, with upfront pricing before anything gets loaded.",
    highlights: ["North End & East End", "Downtown & the Linen District", "Boise Bench", "Southeast Boise & the foothills"],
    county: "Ada",
    disposalSite: "the Ada County Landfill on Seamans Gulch Road",
  },
  {
    slug: "meridian-id",
    name: "Meridian",
    metaTitle: "Junk Removal in Meridian, ID",
    metaDescription:
      "Fast junk removal in Meridian, ID for new-construction cleanups, garage cleanouts, and moving day. Upfront pricing, same-day service available.",
    intro:
      "Meridian is one of the fastest-growing cities in the Treasure Valley, and we keep pace — same-day and next-day hauling for new homeowners, builders, and long-time residents alike.",
    detail:
      "New subdivisions mean a steady stream of builder debris, packaging, and leftover materials, while established Meridian neighborhoods need the occasional garage or storage cleanout. We handle both without you needing to rent a dumpster or make a landfill run yourself.",
    highlights: ["Downtown Meridian", "Paramount & Rockbury", "South Meridian new construction", "Ten Mile corridor"],
    county: "Ada",
    disposalSite: "the Ada County Landfill on Seamans Gulch Road",
  },
  {
    slug: "eagle-id",
    name: "Eagle",
    metaTitle: "Junk Removal in Eagle, ID",
    metaDescription:
      "Professional junk removal in Eagle, ID for larger properties and acreages. Furniture, hot tubs, and estate cleanouts hauled carefully. Free quotes.",
    intro:
      "Eagle's larger lots and acreages call for a crew that's comfortable with bigger jobs — old hot tubs, full outbuildings, and estate cleanouts on properties with real square footage.",
    detail:
      "We bring the manpower and truck capacity that Eagle's larger homes and properties actually need, and we're careful with landscaping, gates, and long driveways along the way. Same upfront pricing and no-surprise-fees approach as everywhere else in the valley.",
    highlights: ["Downtown Eagle", "Eagle foothills & acreages", "Floating Feather corridor", "River Run & Eagle Island area"],
    county: "Ada",
    disposalSite: "the Ada County Landfill on Seamans Gulch Road",
  },
  {
    slug: "nampa-id",
    name: "Nampa",
    metaTitle: "Junk Removal in Nampa, ID",
    metaDescription:
      "Reliable junk removal in Nampa, ID for homes, rental properties, and small businesses. Same-day appointments and upfront pricing available.",
    intro:
      "Nampa homeowners, landlords, and small business owners call us for the same reason: a clear price up front and a crew that actually shows up when scheduled.",
    detail:
      "Rental turnovers are a big part of what we do in Nampa — coordinating directly with property managers and landlords to clear a unit fast between tenants. We handle single-item pickups just as readily as full-property cleanouts.",
    highlights: ["Downtown Nampa", "Nampa Bench", "Sunny Ridge & East Nampa", "Lake Lowell area"],
    county: "Canyon",
    disposalSite: "the Pickles Butte Landfill south of Nampa",
  },
  {
    slug: "caldwell-id",
    name: "Caldwell",
    metaTitle: "Junk Removal in Caldwell, ID",
    metaDescription:
      "Junk, furniture, appliance, and yard waste removal in Caldwell, ID. Locally owned, licensed and insured, with free upfront quotes.",
    intro:
      "Caldwell's blend of established neighborhoods, College of Idaho-area rentals, and newer residential growth means we see everything from yard waste to full estate cleanouts.",
    detail:
      "Larger lots on Caldwell's edges often come with fencing, landscaping debris, and outbuildings that need clearing alongside the usual furniture and appliances — we quote the whole job up front so there's no guessing what it'll cost.",
    highlights: ["Downtown Caldwell", "College of Idaho area", "Sky Ranch & Fairview", "West Caldwell"],
    county: "Canyon",
    disposalSite: "the Pickles Butte Landfill south of Nampa",
  },
  {
    slug: "kuna-id",
    name: "Kuna",
    metaTitle: "Junk Removal in Kuna, ID",
    metaDescription:
      "Full-service junk removal in Kuna, ID including construction debris and cleanouts. Same-day service, upfront pricing, free quotes.",
    intro:
      "Kuna's new-construction boom keeps our trucks busy with builder debris and cleanouts, alongside the standard furniture, appliance, and garage jobs from established Kuna homes.",
    detail:
      "Whether it's scrap materials left behind after a remodel or a garage that's been filling up for years, we're on the road through Kuna regularly and can usually get to you same-day or next-day.",
    highlights: ["Downtown Kuna", "Kuna new-construction developments", "Indian Creek area", "South Kuna acreages"],
    county: "Ada",
    disposalSite: "the Ada County Landfill on Seamans Gulch Road",
  },
  {
    slug: "star-id",
    name: "Star",
    metaTitle: "Junk Removal in Star, ID",
    metaDescription:
      "Prompt junk removal in Star, ID for homes and new-construction sites. Furniture, appliances, and full cleanouts. Free instant quotes.",
    intro:
      "Star's rapid growth on the west side of the valley means a lot of new-construction cleanup alongside standard household junk removal — we handle both.",
    detail:
      "As one of the newer and fastest-changing communities in the Treasure Valley, Star sees a steady mix of builder leftovers and first-time-homeowner garage cleanouts. We show up with upfront pricing and no hidden fees either way.",
    highlights: ["Downtown Star", "Star new-construction developments", "Hartley Ranch area"],
    county: "Ada",
    disposalSite: "the Ada County Landfill on Seamans Gulch Road",
  },
  {
    slug: "middleton-id",
    name: "Middleton",
    metaTitle: "Junk Removal in Middleton, ID",
    metaDescription:
      "Dependable junk removal for the Middleton, ID community. Furniture, appliances, and cleanouts hauled fast with upfront pricing.",
    intro:
      "Middleton is a tight-knit community, and we treat every job here that way — on time, upfront about pricing, and respectful of your property.",
    detail:
      "From single-item pickups to full garage and estate cleanouts, Middleton residents get the same same-day and next-day scheduling we offer across the rest of the Treasure Valley.",
    highlights: ["Downtown Middleton", "Purple Sage area", "Middleton new construction"],
    county: "Canyon",
    disposalSite: "the Pickles Butte Landfill south of Nampa",
  },
];

export type ServicePageContent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  process: string[];
  faqs: Array<{ q: string; a: string }>;
};

export const SERVICE_PAGES: ServicePageContent[] = [
  {
    slug: "appliance-removal",
    title: "Appliance Removal",
    metaTitle: "Appliance Removal",
    metaDescription:
      "Fridge, washer, dryer, and appliance removal across the Treasure Valley. We disconnect, haul, and recycle responsibly. Free upfront quotes.",
    intro:
      "Old refrigerators, washers, dryers, dishwashers, and water heaters are heavy, awkward, and not something most people want to move alone. We handle the disconnection, hauling, and responsible disposal or recycling of bulky appliances anywhere in the Treasure Valley.",
    process: [
      "Tell us what appliance(s) you need gone and where they are — a photo helps us quote accurately.",
      "We give you an upfront price before we schedule anything.",
      "Our crew disconnects and carefully hauls the appliance out, protecting floors and doorways along the way.",
      "We recycle scrap metal and functioning units whenever possible instead of sending everything to the landfill.",
    ],
    faqs: [
      {
        q: "Do you disconnect the appliance for me?",
        a: "Yes, for standard hookups (water lines, standard outlets) our crew can disconnect most appliances on the spot. Gas line disconnects should be handled by a licensed technician first for safety.",
      },
      {
        q: "Can you take a non-working appliance?",
        a: "Yes — working or not, we'll haul it. Non-working units are recycled for scrap metal whenever possible.",
      },
      {
        q: "Do I need to empty the appliance first?",
        a: "Please empty and defrost refrigerators/freezers before your appointment if possible — it makes the pickup faster and cleaner for everyone.",
      },
    ],
  },
  {
    slug: "construction-debris",
    title: "Construction Debris Removal",
    metaTitle: "Construction Debris Removal",
    metaDescription:
      "Scrap wood, drywall, roofing, and remodel debris hauled from job sites across the Treasure Valley. Contractor-friendly scheduling and upfront pricing.",
    intro:
      "Remodels and new builds generate more waste than most people plan for — torn-out cabinets, drywall scrap, broken concrete, roofing tear-off, and packaging from every appliance and fixture. We clear job sites and driveways so your crew keeps working and your project stays on schedule, without you tying up a dumpster permit for weeks.",
    process: [
      "Tell us what's on site and whether it's stacked, loose, or still coming out of the structure.",
      "You get an upfront price — we can quote per load for ongoing projects or as a single cleanup.",
      "Our crew loads and sweeps the area, keeping access lanes and neighboring properties clear.",
      "Clean wood, metal, and cardboard are separated for recycling instead of going straight to the landfill.",
    ],
    faqs: [
      {
        q: "Can you come back multiple times during a project?",
        a: "Yes — repeat pickups during a build or remodel are common. Many contractors have us swing through at framing, drywall, and finish stages rather than renting a dumpster for the full duration.",
      },
      {
        q: "Do you take concrete, brick, and dirt?",
        a: "Yes, though heavy materials like concrete, brick, and dirt are priced by weight rather than volume since they max out a truck's weight limit long before they fill it. Send a photo and we'll quote it accurately.",
      },
      {
        q: "Can you haul asbestos or treated materials?",
        a: "No. Asbestos, lead paint debris, and other hazardous materials require a licensed abatement contractor. We'll happily take everything else once that work is done.",
      },
    ],
  },
  {
    slug: "estate-cleanouts",
    title: "Estate Cleanouts",
    metaTitle: "Estate Cleanout Services",
    metaDescription:
      "Respectful, efficient estate cleanout services throughout the Treasure Valley. We sort, donate, recycle, and haul so families can focus on what matters.",
    intro:
      "Estate cleanouts happen during some of the hardest transitions a family goes through, and we handle every one with care. Our crew works efficiently and respectfully to clear a home — sorting items to donate or recycle wherever we can — so you can focus on the people involved instead of the logistics.",
    process: [
      "We talk through the scope of the property and timeline with you or the family/estate representative.",
      "You get a clear, upfront quote based on the volume of items and any special handling needed.",
      "Our crew sorts as we go, setting aside donatable items when directed and recycling what we can.",
      "We leave the space swept and cleared, ready for its next step — whether that's sale, rental, or family use.",
    ],
    faqs: [
      {
        q: "Do I need to be present for an estate cleanout?",
        a: "Not necessarily. Many families coordinate the details in advance by phone or email and aren't on-site for the full job, especially out-of-town family members handling a property remotely.",
      },
      {
        q: "Can you set aside items we want to keep or donate?",
        a: "Yes — just flag those items or areas clearly before we start, or walk our crew through the space first.",
      },
      {
        q: "How is pricing determined for a full estate cleanout?",
        a: "Pricing is based on the volume of items relative to truck space, plus labor and disposal — you'll get an upfront number before we begin, not a surprise afterward.",
      },
    ],
  },
  {
    slug: "furniture-removal",
    title: "Furniture Removal",
    metaTitle: "Furniture Removal",
    metaDescription:
      "Couch, mattress, table, and furniture removal across the Treasure Valley. We carry it out, you don't lift a thing. Free upfront quotes.",
    intro:
      "Sectionals that won't fit back down the stairwell, mattresses the donation center turned away, a dining set that's been in the spare room for three years — furniture is the single most common thing we haul. Our crew does all the lifting and navigating, so nothing gets dragged across your floors or wedged in a doorway.",
    process: [
      "Send a photo of the piece and tell us what floor it's on — that's usually all we need to quote.",
      "You get an upfront price based on the size of the item and how much truck space it takes.",
      "We carry it out, protecting door frames, railings, and flooring on the way.",
      "Anything still usable goes to a local donation partner; the rest is broken down for recycling where possible.",
    ],
    faqs: [
      {
        q: "Can you take a mattress and box spring?",
        a: "Yes. Mattresses need special handling at the landfill and most donation centers won't accept them, which is exactly why people call us. We haul them and route them to the right facility.",
      },
      {
        q: "Do I need to move the furniture outside first?",
        a: "No — carrying it out is the service. Leave it where it sits. If you'd rather set items at the curb ahead of time that's fine too, but it isn't required and doesn't change the price much.",
      },
      {
        q: "What if the couch won't fit through the door?",
        a: "It usually will, but our crew carries tools to disassemble legs, arms, and frames when a piece came in before a doorway was narrowed or a railing was added. That's part of the job, not an extra.",
      },
    ],
  },
  {
    slug: "garage-cleanouts",
    title: "Garage Cleanouts",
    metaTitle: "Garage Cleanout Services",
    metaDescription:
      "Reclaim your garage from years of clutter. Fast, affordable garage cleanout service across the Treasure Valley. Free upfront quotes.",
    intro:
      "Garages have a way of quietly filling up over the years with things that were supposed to be temporary. We clear out old furniture, boxes, tools, paint cans, and general clutter so you can actually park in it again — or just get your space back.",
    process: [
      "Walk us through what's staying and what's going, or point us to the whole thing.",
      "We quote based on how much of the truck your items will fill.",
      "Our crew loads everything, sweeping up loose debris as we go.",
      "Usable items are set aside for donation when possible; the rest is sorted for recycling or disposal.",
    ],
    faqs: [
      {
        q: "Do you take paint and chemicals from the garage?",
        a: "We're unable to take hazardous materials like paint, solvents, and chemicals — your local household hazardous waste facility handles those. We can haul everything else.",
      },
      {
        q: "What if I only need part of the garage cleared?",
        a: "That's the majority of what we do — just show us what's coming out and we'll quote that portion.",
      },
      {
        q: "How quickly can you get to a garage cleanout?",
        a: "We offer same-day and next-day appointments across the Treasure Valley whenever our schedule allows.",
      },
    ],
  },
  {
    slug: "hot-tub-removal",
    title: "Hot Tub Removal",
    metaTitle: "Hot Tub Removal",
    metaDescription:
      "Safe, efficient hot tub removal and disposal across the Treasure Valley. Heavy and awkward is what we do. Free upfront quotes.",
    intro:
      "Old hot tubs are heavy, bulky, and genuinely difficult to move without the right crew and equipment — which is exactly what we bring. We disassemble, haul, and responsibly dispose of or recycle hot tubs so you're not stuck with a broken one taking up your yard or deck.",
    process: [
      "Send us a photo of the hot tub and its location — deck, ground level, fenced yard, etc.",
      "We give you an upfront price based on size, condition, and access.",
      "Our crew drains, disassembles as needed, and hauls the unit out without damaging your yard or deck.",
      "Metal components and usable parts are recycled whenever possible.",
    ],
    faqs: [
      {
        q: "Do I need to drain the hot tub first?",
        a: "No — our crew handles draining as part of the removal, though letting us know the water is still in it helps us plan the job correctly.",
      },
      {
        q: "Can you get a hot tub off a deck or out of a fenced yard?",
        a: "In most cases, yes. Let us know about gates, stairs, or tight access points when you request your quote so we can plan the right approach.",
      },
      {
        q: "What happens to the hot tub after you remove it?",
        a: "We break it down and recycle the metal frame and motor components whenever possible rather than sending the whole unit to a landfill intact.",
      },
    ],
  },
  {
    slug: "office-cleanouts",
    title: "Office Cleanouts",
    metaTitle: "Office & Commercial Cleanouts",
    metaDescription:
      "Office furniture, cubicle, and electronics removal across the Treasure Valley. After-hours scheduling available so your team keeps working.",
    intro:
      "Downsizing, relocating, or finally clearing the storage room nobody has opened since the last move — commercial cleanouts run on a different clock than residential ones. We work around your business hours, keep common areas and elevators clear, and handle old desks, chairs, cubicle panels, filing cabinets, and electronics in one coordinated pass.",
    process: [
      "Walk us through the space and your timeline, including any building access or elevator reservation rules.",
      "You get an upfront quote for the whole job, which we can put in writing for your accounting or property manager.",
      "Our crew works after hours or on weekends when needed so your team isn't stepping around the job.",
      "Electronics are routed to certified e-waste recycling, and usable office furniture is offered to local donation partners.",
    ],
    faqs: [
      {
        q: "Can you work after hours or on a weekend?",
        a: "Yes, and for most office jobs that's the better option. Tell us the window your building allows and we'll schedule the crew into it.",
      },
      {
        q: "What happens to old computers and monitors?",
        a: "Electronics go to certified e-waste recycling rather than the landfill. If devices held business data, wipe or remove the drives before pickup — we can't guarantee data destruction as part of standard hauling.",
      },
      {
        q: "Can you provide an invoice for a business account?",
        a: "Yes. We invoice commercial jobs and can provide documentation your property manager or bookkeeper needs, including proof of insurance.",
      },
    ],
  },
  {
    slug: "rental-property-cleanouts",
    title: "Rental Property Cleanouts",
    metaTitle: "Rental Property & Tenant Turnover Cleanouts",
    metaDescription:
      "Fast rental turnover cleanouts for Treasure Valley landlords and property managers. Clear a unit between tenants in a single visit.",
    intro:
      "Every day a unit sits full of the last tenant's belongings is a day it isn't earning. We clear rentals fast — furniture, appliances, garage and patio leftovers, and the piles that get abandoned at move-out — so you can get to paint and carpet without losing a week to the dump run yourself.",
    process: [
      "Send photos or give us the unit address and access details; you don't need to meet us there.",
      "We quote the full unit up front so you can budget the turnover accurately.",
      "Our crew clears the unit in one visit where possible and sweeps out behind it.",
      "We can send before-and-after photos on request for your records or a deposit dispute.",
    ],
    faqs: [
      {
        q: "Do I need to be at the property?",
        a: "No. Most landlords and property managers hand off access details — a lockbox code or an unlocked garage — and we send confirmation photos when the job is done.",
      },
      {
        q: "Can you document what was removed for a deposit claim?",
        a: "Yes. Ask when you book and we'll take before-and-after photos of the unit so you have documentation for a security deposit deduction.",
      },
      {
        q: "How fast can you turn a unit around?",
        a: "Often same-day or next-day depending on our schedule. Turnovers are time-sensitive and we treat them that way — tell us your relist date when you call.",
      },
    ],
  },
  {
    slug: "storage-unit-cleanouts",
    title: "Storage Unit Cleanouts",
    metaTitle: "Storage Unit Cleanouts",
    metaDescription:
      "Full storage unit cleanouts across the Treasure Valley so you can stop paying monthly rent on a unit you don't use. Free upfront quotes.",
    intro:
      "A storage unit that started as a six-month solution has a way of becoming a six-year bill. We empty units completely so you can hand back the key and stop the monthly charge — including the ones nobody has opened in years and can't quite remember the contents of.",
    process: [
      "Tell us the facility, unit size, and roughly how full it is — a photo from the door is ideal.",
      "You get an upfront price based on how much of our truck the contents will fill.",
      "Our crew empties the unit and sweeps it out to meet the facility's move-out condition.",
      "We set aside anything you've flagged to keep, and donate or recycle what we can of the rest.",
    ],
    faqs: [
      {
        q: "Can you meet the facility's access hours?",
        a: "Yes — just tell us the gate hours and any access code when you book. Most facilities in the valley have windows that work fine with our schedule.",
      },
      {
        q: "What if I want to keep a few things?",
        a: "Point them out before we start, or leave them marked in a corner. We'll set them aside rather than load them.",
      },
      {
        q: "Do I have to be there to unlock it?",
        a: "Someone needs to provide access — either meeting us there, leaving the unit unlocked, or arranging it with the facility office in advance. We can't cut a lock without the owner's authorization.",
      },
    ],
  },
  {
    slug: "yard-waste-removal",
    title: "Yard Waste Removal",
    metaTitle: "Yard Waste & Landscaping Debris Removal",
    metaDescription:
      "Branches, brush, sod, old fencing, and landscaping debris hauled across the Treasure Valley. More than your green bin holds, gone in one trip.",
    intro:
      "Storm damage, a tree that finally came down, a fence replaced, or a landscaping project that produced ten times more debris than the green bin holds. We haul branches, brush, sod, dirt, rock, and torn-out fencing and decking so you're not making six trips with a tarp over the truck bed.",
    process: [
      "Show us the pile — a photo from a few steps back helps us judge the volume.",
      "You get an upfront price; heavy material like sod, dirt, and rock is quoted by weight rather than volume.",
      "Our crew loads it out, including from back yards and side gates, and rakes the area behind us.",
      "Clean green waste goes to compost or green-waste processing rather than the landfill wherever possible.",
    ],
    faqs: [
      {
        q: "Do I need to bundle or cut the branches first?",
        a: "No. Loose piles are fine and we bring our own tools to cut down anything too long for the truck.",
      },
      {
        q: "Can you take dirt, sod, and rock?",
        a: "Yes, but these are priced by weight since they hit a truck's weight limit well before filling it. Let us know roughly how much there is and we'll quote it properly.",
      },
      {
        q: "Can you get to a pile in the back yard?",
        a: "Usually yes. Mention gate width and whether there are stairs or tight turns when you request a quote so we bring the right equipment.",
      },
    ],
  },
];

export type NavLink = {
  label: string;
  href: string;
  // Present only on the tabs that open a dropdown. The parent href is still a
  // real destination — it's the "All ..." entry inside the menu, and it's what
  // the footer links to, since the footer has no dropdowns.
  children?: Array<{ label: string; href: string }>;
};

// Defined here at the bottom rather than up top because the two dropdowns are
// built from SERVICES and CITY_PAGES — the menus can't drift out of sync with
// the pages that actually exist.
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Instant Quote", href: "/quote" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Services",
    // A real hub page, not the homepage's #services anchor. The dropdown's
    // "All Services" entry uses this href, so the ten service pages now hang
    // off a page that can rank on its own instead of a fragment link.
    href: "/services",
    // Matched on slug for the same reason ServicesGrid does: the short card
    // labels ("Yard Waste") don't equal the page titles ("Yard Waste
    // Removal"), so a title match would silently drop entries.
    children: SERVICES.filter((service) =>
      SERVICE_PAGES.some((page) => page.slug === service.slug)
    ).map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    children: CITY_PAGES.map((city) => ({
      label: `${city.name}, ID`,
      href: `/junk-removal/${city.slug}`,
    })),
  },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];
