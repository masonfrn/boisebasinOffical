export const SITE_URL = "https://boisebasinjunkremoval.com";

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
  // Approximate service-area center used for LocalBusiness geo in schema.
  // This is a service-area business with no public storefront — confirm this
  // is how you want to represent location before treating it as exact.
  geo: { latitude: 43.615, longitude: -116.2023 },
};

// Placeholder hours — confirm actual operating hours and update before relying
// on this for LocalBusiness openingHoursSpecification schema.
export const BUSINESS_HOURS = [
  { day: "Monday", opens: "07:00", closes: "19:00" },
  { day: "Tuesday", opens: "07:00", closes: "19:00" },
  { day: "Wednesday", opens: "07:00", closes: "19:00" },
  { day: "Thursday", opens: "07:00", closes: "19:00" },
  { day: "Friday", opens: "07:00", closes: "19:00" },
  { day: "Saturday", opens: "08:00", closes: "17:00" },
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

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Instant Quote", href: "/quote" },
  { label: "About", href: "/about" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
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

export const SERVICES = [
  { title: "Furniture Removal", desc: "Couches, mattresses, tables, and anything else taking up space." },
  { title: "Appliance Removal", desc: "Fridges, washers, dryers, and other bulky appliances hauled safely." },
  { title: "Garage Cleanouts", desc: "Reclaim your garage from years of accumulated clutter." },
  { title: "Estate Cleanouts", desc: "Respectful, efficient cleanouts during a difficult transition." },
  { title: "Construction Debris", desc: "Scrap wood, drywall, and remodel leftovers cleared fast." },
  { title: "Yard Waste", desc: "Branches, dirt, old fencing, and landscaping debris removed." },
  { title: "Storage Units", desc: "Full unit cleanouts so you can close it out and move on." },
  { title: "Rental Property Cleanouts", desc: "Fast turnarounds between tenants, coordinated with landlords." },
  { title: "Office Cleanouts", desc: "Desks, electronics, and furniture removed with minimal disruption." },
  { title: "Hot Tub Removal", desc: "Heavy, awkward, and not a problem for our crew." },
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

export const TESTIMONIALS: Array<{
  name: string;
  location: string;
  quote: string;
  rating: number;
}> = [];

export type CityPage = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  detail: string;
  highlights: string[];
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
];
