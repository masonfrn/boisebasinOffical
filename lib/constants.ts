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
};

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
