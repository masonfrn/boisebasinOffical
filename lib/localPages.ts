import { CITY_PAGES, SERVICE_PAGES, type CityPage, type ServicePageContent } from "@/lib/constants";

/**
 * Content for the service-by-city landing pages (10 services x 8 cities = 80).
 *
 * Each entry carries copy that is only true of that one service in that one
 * city. This is deliberate: a page whose only difference from 79 others is a
 * find-and-replaced city name is the textbook "doorway page" pattern, and
 * Google filters those out — often dragging the city pages that already rank
 * down with them. `intro` and `localNote` are the honest variation.
 *
 * The rest of each page composes from content that legitimately is shared:
 * the service's process steps and FAQs (from SERVICE_PAGES) and the city's
 * neighborhoods and disposal site (from CITY_PAGES).
 */
export type LocalPageContent = {
  /** SERVICE_PAGES slug */
  service: string;
  /** CITY_PAGES slug */
  city: string;
  /** 2-3 sentences on why this service looks different in this city. */
  intro: string;
  /** One concrete operational detail: access, terrain, timing, or disposal. */
  localNote: string;
};

export const LOCAL_PAGES: LocalPageContent[] = [
  // ---------------------------------------------------------------- Furniture
  {
    service: "furniture-removal",
    city: "boise-id",
    intro:
      "Boise's older housing stock is the reason most furniture removal calls here are really access problems. North End and East End homes were built long before anyone was buying 110-inch sectionals, and a staircase with a landing halfway up will stop a sleeper sofa cold. We show up expecting that.",
    localNote:
      "Downtown condo and Linen District jobs come with their own constraint: freight elevator windows and 20-minute loading zones. Tell us the building when you book and we'll schedule around its rules rather than circling the block with a couch on the sidewalk.",
  },
  {
    service: "furniture-removal",
    city: "meridian-id",
    intro:
      "A lot of Meridian furniture removal is upgrade churn. Families move into a new build in Paramount or off Ten Mile, discover the apartment furniture looks wrong in a great room with 12-foot ceilings, and need the old set gone the same week the new one lands.",
    localNote:
      "Most Meridian subdivisions run active HOAs, which means furniture can't sit at the curb waiting for a bulk pickup day. We take it straight from the house to the truck so nothing ends up in front of your garage collecting a violation notice.",
  },
  {
    service: "furniture-removal",
    city: "eagle-id",
    intro:
      "Furniture in Eagle tends to be bigger and further from the road. Custom homes on acreage hold oversized pieces — 10-foot dining tables, executive desks, full bedroom sets in guest wings — and the walk from the room to the truck can be a hundred yards of landscaping.",
    localNote:
      "Long paved driveways and gated entries off Floating Feather mean we plan the approach before the crew arrives. We'd rather stage a dolly run across a lawn on plywood than put truck ruts in irrigated turf you're paying to keep green.",
  },
  {
    service: "furniture-removal",
    city: "nampa-id",
    intro:
      "In Nampa, furniture removal and tenant turnover overlap constantly. Landlords call us about the couch and mattress the last tenant left behind, and homeowners call about the same pieces for ordinary reasons — but both need it gone before something else can happen in that room.",
    localNote:
      "We can work from a lockbox code without you meeting us at the property, which matters when you own a Nampa rental and live somewhere else in the valley. Confirmation photos go out when the load leaves.",
  },
  {
    service: "furniture-removal",
    city: "caldwell-id",
    intro:
      "Caldwell furniture jobs cluster around two very different situations: student rentals near the College of Idaho cycling tenants every spring, and long-held family homes in established neighborhoods where a piece has been in place for thirty years and nobody's sure it'll fit back out.",
    localNote:
      "Older Caldwell homes frequently have basement stairs with a tight turn at the bottom — a spot where sectionals and box springs get stuck. Our crew carries the tools to take arms and legs off rather than forcing a piece through a doorway.",
  },
  {
    service: "furniture-removal",
    city: "kuna-id",
    intro:
      "Kuna's growth means a steady stream of first upgrades. People buy a new-construction home, live with the starter furniture for a year or two, and then replace it all at once — leaving a garage full of pieces that are too worn to sell and too bulky to haul themselves.",
    localNote:
      "Kuna sits at the south edge of our route, so we batch jobs here and can often add you to a run we're already making. Flexible timing on your end usually means we can get to you sooner rather than later.",
  },
  {
    service: "furniture-removal",
    city: "star-id",
    intro:
      "Star has one of the newest housing stocks in the valley, which makes furniture removal here mostly about transition rather than age. New owners in Hartley Ranch and the developments off State Street are furnishing fast and clearing out whatever came with them from the last place.",
    localNote:
      "Newer Star construction means wide doorways and attached garages, so most pickups here are quick — often a single-item call that takes under half an hour. We price those small, and we'd rather tell you that up front than pad a quote.",
  },
  {
    service: "furniture-removal",
    city: "middleton-id",
    intro:
      "Middleton furniture calls are often about family pieces rather than mass-market ones — a farmhouse table, a hutch, a hide-a-bed that's been passed between relatives twice. Some of it is worth donating and some has reached the end, and we sort that with you rather than for you.",
    localNote:
      "Anything still usable from a Middleton pickup goes to a donation partner before it goes anywhere else. If a piece has life left in it, say so and we'll route it that direction instead of adding it to the load.",
  },

  // ---------------------------------------------------------------- Appliance
  {
    service: "appliance-removal",
    city: "boise-id",
    intro:
      "Boise's older homes put laundry in basements and kitchens in tight footprints, which turns a routine appliance swap into a genuine carry. A 1940s Bench house with a narrow basement stair is a very different washer removal than a ground-floor laundry room, and it's the one we see most.",
    localNote:
      "Ada County loads run to the Ada County Landfill on Seamans Gulch Road, but working units and scrap metal get separated out first — a dead fridge is worth more as recycled steel than as landfill volume, and that's reflected in what we charge you.",
  },
  {
    service: "appliance-removal",
    city: "meridian-id",
    intro:
      "Meridian generates a particular kind of appliance job: builder-grade units pulled out of nearly new homes. Buyers close on a house, live with the base-package dishwasher and range for a season, then upgrade — and need working appliances removed, not broken ones.",
    localNote:
      "Working Meridian pull-outs are worth donating, and we'll route them that way when the unit is in good shape and you're willing to wait for a donation pickup window rather than same-day disposal. Just tell us which you'd rather have.",
  },
  {
    service: "appliance-removal",
    city: "eagle-id",
    intro:
      "Eagle appliance calls are frequently about the second one — the garage refrigerator, the deep freeze in the shop, the spare washer in an outbuilding that stopped working two winters ago and has been sitting since. Acreage properties collect these quietly.",
    localNote:
      "If the unit is in a detached shop or barn well off the driveway, mention it when you book. We'll bring appliance dollies and straps sized for a long push over gravel instead of discovering the distance when the crew pulls in.",
  },
  {
    service: "appliance-removal",
    city: "nampa-id",
    intro:
      "Nampa's rental density makes appliance removal a landlord service as much as a homeowner one. Ranges and refrigerators get replaced on turnover schedules, and the old unit has to be out of the unit before the new one can be delivered — usually within a tight window.",
    localNote:
      "Canyon County jobs run to the Pickles Butte Landfill south of Nampa, which is close enough that Nampa appliance pickups have one of the shortest round trips we make. That keeps the disposal portion of your quote low.",
  },
  {
    service: "appliance-removal",
    city: "caldwell-id",
    intro:
      "Caldwell has a lot of homes built before 1980, and the appliances in them tend to be replaced only when they fail outright. That means we're often hauling genuinely old units — chest freezers, wringer-adjacent laundry setups, water heaters with two decades on them.",
    localNote:
      "Old water heaters and freezers are mostly recoverable steel, and Caldwell's proximity to Pickles Butte and area scrap yards means we can route them efficiently. Refrigerant-bearing units are handled separately and legally, not just tipped.",
  },
  {
    service: "appliance-removal",
    city: "kuna-id",
    intro:
      "Between new-construction move-ins and older Kuna homes finally getting updated, appliance removal here splits cleanly in two: nearly new units coming out for upgrades, and thirty-year-old units coming out because they died. We handle both the same way.",
    localNote:
      "Kuna homes on well and septic sometimes have water treatment equipment alongside the water heater. We can haul softener tanks and old filtration units too — just include them in the photo so the quote covers everything in the utility room.",
  },
  {
    service: "appliance-removal",
    city: "star-id",
    intro:
      "Star's building boom means most appliance removal here happens in homes under ten years old. It's upgrade work — replacing the package that came with the house — and the units coming out are usually functional, which changes where they should end up.",
    localNote:
      "Working appliances out of Star homes are good donation candidates. We'll take that route when the timing works for you; when it doesn't, everything metal still gets separated for recycling before the rest goes to the Ada County Landfill.",
  },
  {
    service: "appliance-removal",
    city: "middleton-id",
    intro:
      "Middleton appliance jobs often include the garage or shop unit alongside the kitchen one. Properties here have room for a spare freezer or second fridge, and when those go out it's usually more than one item making the trip.",
    localNote:
      "Middleton runs to Pickles Butte south of Nampa. Because it's a single trip either way, adding a second or third appliance to a Middleton pickup costs far less than booking them separately — worth clearing everything at once if you can.",
  },

  // ------------------------------------------------------------------- Garage
  {
    service: "garage-cleanouts",
    city: "boise-id",
    intro:
      "A lot of Boise garages aren't attached to anything. North End and East End homes have detached single-car garages off the alley, built for a Model A and now holding forty years of paint cans, bike frames, and lumber scraps that never became a project.",
    localNote:
      "Alley access is a real advantage on these jobs — we can back the truck right to the garage door instead of carrying everything to the street. Let us know the alley is usable and we'll plan the approach that way.",
  },
  {
    service: "garage-cleanouts",
    city: "meridian-id",
    intro:
      "Meridian's three-car garages fill faster than anyone expects. The extra bay was meant for a workshop or a boat and instead absorbed moving boxes, outgrown kids' gear, and the patio furniture from the last house — until nobody can park in it.",
    localNote:
      "Most Meridian garage cleanouts we quote come in as partial jobs: clear two bays, leave the workbench and the shelving. Mark what stays with tape or just walk the crew through it first, and we'll quote only the portion that's leaving.",
  },
  {
    service: "garage-cleanouts",
    city: "eagle-id",
    intro:
      "Garage cleanouts in Eagle usually aren't just the garage. Properties out here come with shops, barns, and equipment sheds, and once someone decides to clear the garage the conversation quickly expands to the outbuilding that hasn't been opened since the previous owner.",
    localNote:
      "Eagle jobs of this size often need more than one truckload. We quote the full scope up front rather than filling one load and asking for more money — if it's a two-load job, you'll know that before we start, not after.",
  },
  {
    service: "garage-cleanouts",
    city: "nampa-id",
    intro:
      "In Nampa, the garage is frequently the house's only storage. Older homes here were built without much closet space and no basement, so the garage absorbs everything — and clearing it out is what finally makes the rest of the house workable.",
    localNote:
      "Nampa loads go to Pickles Butte, a short run from most of the city. Garage cleanouts produce a lot of mixed material, and the shorter haul is part of why full-garage jobs price better here than on the Ada County side.",
  },
  {
    service: "garage-cleanouts",
    city: "caldwell-id",
    intro:
      "Caldwell garages often sit alongside a shed, a carport, or a fenced side yard that's collected its own pile. We see a lot of combined jobs here — the garage plus whatever has accumulated against the back fence over the same span of years.",
    localNote:
      "Larger lots on Caldwell's edges mean there's usually room to bring the truck close to the work rather than staging everything down a driveway. That saves crew time, and we pass that through in the quote instead of charging a flat rate.",
  },
  {
    service: "garage-cleanouts",
    city: "kuna-id",
    intro:
      "It surprises people how quickly a new garage in Kuna fills up. Buyers move into a fresh build with the intention of keeping it clean, and within three years the moving boxes never unpacked and the landscaping leftovers have claimed both bays.",
    localNote:
      "Because Kuna homes are mostly newer, these cleanouts tend to be bulky but clean — boxes, plastic bins, packaging, and yard tools rather than decades of hazardous odds and ends. That makes them fast, and fast jobs quote lower.",
  },
  {
    service: "garage-cleanouts",
    city: "star-id",
    intro:
      "Star's growth curve means a lot of households here are on their first or second garage. Cleanouts are usually driven by a change — a new baby, a home gym, a boat that needs the bay — rather than by decades of slow accumulation.",
    localNote:
      "These are often half-day jobs with wide, modern access and no stairs involved. If you can get the crew a clear driveway on arrival, most Star garage cleanouts wrap in a single visit with one load.",
  },
  {
    service: "garage-cleanouts",
    city: "middleton-id",
    intro:
      "Middleton properties tend to have a garage and a shop, and the shop is where the interesting stuff ends up — old fencing, feed equipment, tools inherited from a relative, and materials saved for a project that never came together.",
    localNote:
      "We'll sort as we load if you want anything set aside, which matters more on Middleton jobs than most: there's usually something in the pile worth keeping or donating, and it's easier to catch it on the way out than to go looking after.",
  },

  // ------------------------------------------------------------------- Estate
  {
    service: "estate-cleanouts",
    city: "boise-id",
    intro:
      "Estate cleanouts in Boise's older neighborhoods often mean a house someone lived in for forty or fifty years. North End and Bench homes hold that much accumulation in basements, attics, and detached garages, and the family working through it is usually doing so on a deadline set by a sale or a probate timeline.",
    localNote:
      "We work at whatever pace the family needs. Some Boise estates we clear in a day; others we do in stages over two weeks while relatives go through rooms. Tell us which this is and we'll schedule to match instead of pushing for one visit.",
  },
  {
    service: "estate-cleanouts",
    city: "meridian-id",
    intro:
      "A large share of Meridian estate work is downsizing rather than loss — a parent moving into assisted living and a family deciding what comes along. The house has to be emptied and listed, but the emotional weight is different, and so is the sorting.",
    localNote:
      "When adult children are coordinating a Meridian cleanout from out of state, we handle it by phone and photo. You don't need to fly in to point at things; we'll document what's in the house before we load anything you haven't cleared.",
  },
  {
    service: "estate-cleanouts",
    city: "eagle-id",
    intro:
      "Eagle estates are large in a way that catches families off guard. A house on two acres with a shop, a barn, and a detached garage can hold three times what the square footage suggests, and the outbuildings are usually the part nobody has inventoried.",
    localNote:
      "We walk the whole property before quoting an Eagle estate — house, shop, barn, and anything stored outside — so the number you get accounts for the outbuildings rather than just the residence. Surprises on a job like this are the last thing anyone needs.",
  },
  {
    service: "estate-cleanouts",
    city: "nampa-id",
    intro:
      "Nampa estate cleanouts often involve multi-generational homes where more than one household's belongings have collected under one roof. Sorting is genuinely harder in that situation, because ownership of any given item isn't always obvious.",
    localNote:
      "We don't load anything from a Nampa estate that hasn't been cleared by whoever is directing the job. If a room hasn't been gone through yet, we'll skip it and come back rather than making the call ourselves.",
  },
  {
    service: "estate-cleanouts",
    city: "caldwell-id",
    intro:
      "Caldwell estate work frequently includes property beyond the house — a farmhouse with outbuildings, old equipment behind a fence line, and decades of materials kept because they might be useful. Rural estates rarely stop at the back door.",
    localNote:
      "Farm equipment and scrap metal on a Caldwell property may have salvage value that offsets part of the job. We'll flag it rather than quietly hauling it off, so the estate gets the benefit instead of us.",
  },
  {
    service: "estate-cleanouts",
    city: "kuna-id",
    intro:
      "Estate cleanouts on Kuna's south-side acreages involve a house plus whatever the property was actually used for — shops, animal shelters, equipment storage, and the accumulated materials of rural life. The residence is often the smaller half of the job.",
    localNote:
      "Access on Kuna acreage jobs matters. Gravel drives and gates sized for a tractor rather than a box truck change how we stage the work, so mention the approach when you call and we'll bring the right vehicle.",
  },
  {
    service: "estate-cleanouts",
    city: "star-id",
    intro:
      "Star's newer housing means estate cleanouts here are usually a downsizing move rather than a lifetime's accumulation. The homes are newer, the contents are more manageable, and the timeline is often tied to a pending sale in a fast market.",
    localNote:
      "If the property is going on the market, tell us the listing date. We'll prioritize getting it broom-clean and photo-ready by then rather than treating it as an open-ended job.",
  },
  {
    service: "estate-cleanouts",
    city: "middleton-id",
    intro:
      "Middleton is small enough that estate work here is genuinely personal — families who have been in the area for generations, clearing a home that neighbors know. We handle these quietly and without a crew making a spectacle in the front yard.",
    localNote:
      "We'll set aside anything you've identified for donation, and Middleton families often want specific items to go to specific people. Flag those before we start and we'll keep them separate rather than loading them.",
  },

  // ------------------------------------------------------- Construction debris
  {
    service: "construction-debris",
    city: "boise-id",
    intro:
      "Construction debris in Boise is mostly remodel work, not new builds. Century-old North End and East End homes get kitchens gutted and bathrooms redone, and the debris comes out of a house with no side yard, on a street where a dumpster would eat two parking spots for a month.",
    localNote:
      "That's the real argument for hauling over a dumpster in Boise's older neighborhoods: no permit for a container in the right-of-way, and no dumpster sitting in front of your house through the whole project. We come when there's a pile and leave with it.",
  },
  {
    service: "construction-debris",
    city: "meridian-id",
    intro:
      "Meridian produces more construction debris than anywhere else we work, and most of it is new-build waste — packaging, cut-off lumber, drywall scrap, and the pallets and banding that arrive with every delivery in a subdivision going up all at once.",
    localNote:
      "We run repeat pickups for Meridian builders and contractors, swinging through at framing, drywall, and finish stages. That's usually cheaper than renting a container for the full build, and it keeps the site clear for inspections.",
  },
  {
    service: "construction-debris",
    city: "eagle-id",
    intro:
      "Eagle's construction debris skews custom — one-off homes and substantial remodels rather than tract subdivisions. The material tends to be higher grade, the sites are larger, and the homeowner is often living on the property while the work happens.",
    localNote:
      "On an occupied Eagle property we stage the loading away from the parts of the house you're actually using, and we keep the driveway passable. Nobody should be climbing over debris to get to their own front door.",
  },
  {
    service: "construction-debris",
    city: "nampa-id",
    intro:
      "A lot of Nampa construction debris comes from rehab work — investors and owners updating older homes, pulling out carpet, cabinets, lath, and plaster from houses that haven't been touched in decades. It's dirtier and heavier than new-build waste.",
    localNote:
      "Plaster, tile, and old subfloor are heavy, so Nampa rehab loads get quoted with weight in mind rather than volume alone. The short run to Pickles Butte helps keep that from getting expensive.",
  },
  {
    service: "construction-debris",
    city: "caldwell-id",
    intro:
      "Caldwell sees a steady mix of older-home rehabs and newer residential construction, so debris here ranges from lath and plaster out of a 1920s house to clean framing scrap off a new build a mile away. We price those differently because they haul differently.",
    localNote:
      "Clean wood and cardboard from Caldwell job sites get separated for recycling rather than landfilled whole. On a mostly-lumber load that meaningfully changes the disposal cost, and it should show up in your quote.",
  },
  {
    service: "construction-debris",
    city: "kuna-id",
    intro:
      "Kuna's construction boom keeps our trucks moving through here regularly. Whole streets go up at once, and the debris is the predictable new-build mix: cut lumber, packaging, insulation scrap, and the mountain of cardboard every appliance and fixture arrives in.",
    localNote:
      "Because we're already running Kuna routes for builder debris, adding a site here is often same-week. If you're a contractor working multiple Kuna lots, we can set a standing pickup rather than you calling each time.",
  },
  {
    service: "construction-debris",
    city: "star-id",
    intro:
      "Star is building faster than almost anywhere in the valley for its size, and construction debris here is nearly all new-construction waste. Sites are active, tight to each other, and inspectors want clear access — a pile of scrap by the garage opening is a real problem.",
    localNote:
      "Star sites often can't spare room for a dumpster with lots this close together. Scheduled hauling keeps the lot clear without giving up a parking pad or blocking the neighboring build's access.",
  },
  {
    service: "construction-debris",
    city: "middleton-id",
    intro:
      "Middleton construction work runs to new residential builds and outbuilding projects — shops, garages, and additions on properties with room for them. Debris often includes both framing scrap and the old structure that came down first.",
    localNote:
      "Demolition debris from a torn-down Middleton shed or barn is a different job than framing scrap: more nails, more weight, and often old roofing. Mention what's coming down so we quote for the material actually in the pile.",
  },

  // --------------------------------------------------------------- Yard waste
  {
    service: "yard-waste-removal",
    city: "boise-id",
    intro:
      "Boise's mature tree canopy is the whole story on yard waste here. North End streets are lined with cottonwoods and maples that are eighty years old, and one windstorm produces more limb debris than a green bin will take in a season.",
    localNote:
      "Foothills properties have a second reason to clear brush: defensible space. If you're cutting back growth for fire mitigation above the Bench, that material is bulky and light, and we quote it by volume rather than weight.",
  },
  {
    service: "yard-waste-removal",
    city: "meridian-id",
    intro:
      "Most Meridian yard waste comes from installation rather than cleanup. New-build owners put in landscaping the builder didn't, and the leftovers — sod pallets, excess dirt, rock, plastic edging, and the packaging it all came in — pile up in the driveway.",
    localNote:
      "Sod, dirt, and decorative rock are heavy enough to max out a truck's weight limit before they fill it, so we price Meridian landscaping leftovers by weight. Tell us roughly how many pallets or yards and we'll quote it straight.",
  },
  {
    service: "yard-waste-removal",
    city: "eagle-id",
    intro:
      "Eagle acreages generate yard waste at a scale that doesn't fit residential solutions. Irrigation ditch clearing, windbreak trimming, pasture cleanup, and mature tree work produce piles measured in truckloads rather than bags.",
    localNote:
      "We can drive onto most Eagle properties to load rather than making the crew wheelbarrow brush a hundred yards to the road. If the ground is soft from irrigation, say so and we'll stage on the drive instead of the field.",
  },
  {
    service: "yard-waste-removal",
    city: "nampa-id",
    intro:
      "Nampa yard waste is largely established-landscape maintenance — old trees that need limbing, hedges pulled out, and fence lines cleared on lots that have been planted and replanted over decades. It's rarely a one-bag job.",
    localNote:
      "Clean green waste from Nampa gets routed to composting rather than the landfill wherever we can. Keeping branches and brush separate from mixed junk at the pile makes that possible, so keep them in their own stack if you're able.",
  },
  {
    service: "yard-waste-removal",
    city: "caldwell-id",
    intro:
      "Caldwell's agricultural edges mean yard waste often includes fencing. Old wire, wooden posts, windbreak trimmings, and orchard prunings come out together, and that mix won't go in a green bin under any circumstances.",
    localNote:
      "Wire fencing and posts have to be separated from clean green waste before disposal — they can't go to compost. We sort that on the truck so you're not doing it in the yard first.",
  },
  {
    service: "yard-waste-removal",
    city: "kuna-id",
    intro:
      "Yard waste in Kuna covers both new landscaping installs in the subdivisions and genuine rural clearing on the acreages south of town. Those are different jobs with different equipment, and we quote them separately.",
    localNote:
      "Kuna acreage clearing can involve brush piles that have sat long enough to settle and tangle. Those take longer to load than fresh cuttings, so a photo of the actual pile gets you a far more accurate number than a description.",
  },
  {
    service: "yard-waste-removal",
    city: "star-id",
    intro:
      "Star's new developments are landscaping from bare dirt, which produces a specific kind of waste: excess fill, leftover sod, rock, and the crates and pallets that materials arrive on. It's the debris of building a yard, not maintaining one.",
    localNote:
      "If your Star landscaping project is still in progress, we can come back rather than waiting for one big pile to form. Keeping the driveway clear mid-project is usually worth more than saving a trip.",
  },
  {
    service: "yard-waste-removal",
    city: "middleton-id",
    intro:
      "Middleton yard waste has a rural character — irrigation ditch clearing, windbreak trimming, old fencing coming down, and the seasonal cleanup that comes with properties that have real acreage behind the house.",
    localNote:
      "Middleton green waste runs toward Pickles Butte and area processing south of Nampa. Clean brush and branches can be composted rather than landfilled, so it's worth keeping them out of the mixed pile if the material is separable.",
  },

  // ------------------------------------------------------------ Storage units
  {
    service: "storage-unit-cleanouts",
    city: "boise-id",
    intro:
      "Boise's older homes came without much storage, which is why so many people here rent a unit and keep it far longer than planned. Most Boise storage cleanouts we do are units that have been paid on for years past the point where anyone remembers the contents.",
    localNote:
      "Facilities along Fairview and the Bench mostly run gate hours rather than 24-hour access. Give us the gate code and your window when you book and we'll fit the crew inside it rather than showing up to a locked entrance.",
  },
  {
    service: "storage-unit-cleanouts",
    city: "meridian-id",
    intro:
      "Meridian storage units are usually the overflow from a move that never fully finished. Families relocate into a new build, put the surplus in storage until they figure out where it goes, and then pay monthly for three years while never opening the door.",
    localNote:
      "Meridian has a dense cluster of facilities along Eagle Road and Ten Mile, and most of them require the unit be swept to broom-clean before they'll close your account. We leave it that way so you're not going back with a push broom.",
  },
  {
    service: "storage-unit-cleanouts",
    city: "eagle-id",
    intro:
      "Eagle storage cleanouts often hold the higher-value overflow — furniture from a previous larger home, seasonal decor, recreational equipment. It's usually more sortable than a typical unit, meaning more of it is worth donating rather than dumping.",
    localNote:
      "If you want us to separate donation-worthy items from an Eagle unit, plan for a slightly longer job. Sorting on site takes time, but it keeps usable furniture out of the Ada County Landfill, and most people would rather that.",
  },
  {
    service: "storage-unit-cleanouts",
    city: "nampa-id",
    intro:
      "Nampa has a lot of storage units tied to rental transitions — people between leases, or landlords holding a former tenant's belongings through the required waiting period. Both end with a unit that has to be emptied on a date.",
    localNote:
      "If you're clearing a Nampa unit under a lien or abandoned-property timeline, we can document the contents before removal. Ask for photos when you book so you have the record the process requires.",
  },
  {
    service: "storage-unit-cleanouts",
    city: "caldwell-id",
    intro:
      "Caldwell storage cleanouts frequently follow a life change — a move, a downsizing, or an estate where a relative's unit turns up mid-process and nobody knows what's inside until the door goes up.",
    localNote:
      "We can open and assess a Caldwell unit with you present before committing to a price, which is the honest way to handle a unit nobody has seen the inside of. No quote is accurate through a closed roll-up door.",
  },
  {
    service: "storage-unit-cleanouts",
    city: "kuna-id",
    intro:
      "Kuna's newer residents often keep a unit through the gap between selling one home and settling into the next. When the new place finally has room, the unit needs to empty out — usually all at once, and usually quickly.",
    localNote:
      "Kuna has fewer facilities than the north end of the valley, so a lot of Kuna residents store in Meridian or south Boise. Tell us where the unit actually is, not where you live, so we route the crew correctly.",
  },
  {
    service: "storage-unit-cleanouts",
    city: "star-id",
    intro:
      "Star's rapid growth means a lot of households here stored belongings during a build or a move and never went back for them. The unit was supposed to be temporary and quietly became a line item on the monthly budget.",
    localNote:
      "Most Star residents store in Eagle or Meridian for lack of local facilities. That's fine — we're on those routes constantly, and the unit's location matters more to scheduling than your home address does.",
  },
  {
    service: "storage-unit-cleanouts",
    city: "middleton-id",
    intro:
      "Middleton storage cleanouts often involve units rented during a property transition — a build, a remodel, or a family member's move — that outlasted the reason they were rented in the first place.",
    localNote:
      "Middleton units are usually stored in Caldwell or Nampa, both short runs to Pickles Butte. That keeps the disposal leg of a Middleton storage cleanout quick and the quote correspondingly lower.",
  },

  // ---------------------------------------------------------- Rental property
  {
    service: "rental-property-cleanouts",
    city: "boise-id",
    intro:
      "Boise's rental market turns over hard around the university calendar and the summer moving season. Units near Boise State and along the Bench empty out with furniture, mattresses, and half-packed boxes left behind, and the next lease usually starts within days.",
    localNote:
      "Boise turnovers are tight on timing more than anything else. Tell us your relist date when you call and we'll work backward from it — clearing the unit early enough that paint and carpet crews aren't stuck waiting on us.",
  },
  {
    service: "rental-property-cleanouts",
    city: "meridian-id",
    intro:
      "Meridian rentals are increasingly single-family homes rather than apartments, which changes what a turnover looks like. There's a garage, a yard, and often a shed involved — considerably more to clear than a two-bedroom unit.",
    localNote:
      "Don't forget the garage and side yard when you scope a Meridian turnover. They're where the bulky abandoned items end up, and they're the part most owners forget to include when asking for a quote.",
  },
  {
    service: "rental-property-cleanouts",
    city: "eagle-id",
    intro:
      "Eagle rentals sit at the higher end of the market, and turnovers here are usually about presentation as much as clearing. The property needs to show well quickly, which means the cleanout has to be thorough rather than merely fast.",
    localNote:
      "We'll clear outbuildings and the yard along with the house on an Eagle turnover, since a shop full of a former tenant's belongings will stall a showing just as surely as a living room will.",
  },
  {
    service: "rental-property-cleanouts",
    city: "nampa-id",
    intro:
      "Nampa is where we do the most rental turnover work in the valley. The rental stock is large, many owners are managing several units, and the economics only work if a vacant unit gets re-leased fast rather than sitting full of someone else's furniture.",
    localNote:
      "For Nampa owners running multiple properties, we can work from a standing arrangement rather than a fresh quote every time. Same crew, same process, and an invoice you can hand straight to your bookkeeper.",
  },
  {
    service: "rental-property-cleanouts",
    city: "caldwell-id",
    intro:
      "Caldwell turnovers cluster around the College of Idaho calendar and the general spring-to-summer moving window. Student rentals in particular tend to be left with furniture that was never going to make the trip home.",
    localNote:
      "We can document a Caldwell unit with before-and-after photos if you're deducting the cleanout from a security deposit. Ask at booking — it's easier to take the photos while we're there than to reconstruct the case later.",
  },
  {
    service: "rental-property-cleanouts",
    city: "kuna-id",
    intro:
      "Kuna's rental stock is newer and largely single-family, so turnovers here are typically whole houses rather than units. The volume is higher, but the properties are in better condition, and the jobs are cleaner than older-stock turnovers.",
    localNote:
      "Kuna properties often sit far enough out that a wasted trip is expensive. Confirm access — lockbox code, garage code, or an unlocked side gate — before the crew rolls, and we won't have to reschedule.",
  },
  {
    service: "rental-property-cleanouts",
    city: "star-id",
    intro:
      "Star rentals are mostly newer single-family homes, and turnover cleanouts here are usually light — the leftovers of a move rather than an abandoned household. Fast and straightforward is the norm.",
    localNote:
      "Because Star turnovers tend to be small, they're a good candidate for adding onto a route we're already running through Eagle or Middleton. Flexible timing on your end often means a lower price.",
  },
  {
    service: "rental-property-cleanouts",
    city: "middleton-id",
    intro:
      "Middleton's rental market is small enough that owners here usually manage their own properties directly. That means the person calling us is the person who'll be showing the house next week, and speed matters accordingly.",
    localNote:
      "We can go straight from cleanout to a swept, showing-ready property in one visit on most Middleton rentals. If you've got a showing scheduled, tell us when and we'll build the job around it.",
  },

  // ------------------------------------------------------------------- Office
  {
    service: "office-cleanouts",
    city: "boise-id",
    intro:
      "Downtown Boise is where commercial cleanouts get genuinely logistical. Multi-tenant buildings mean reserved freight elevators, a loading dock you have to book, and a building manager with rules about when a crew can move furniture through a shared lobby.",
    localNote:
      "Tell us the building and we'll handle the coordination — dock reservation, elevator pads, certificate of insurance for the property manager. Most downtown Boise buildings require all three, and it's faster if we sort it in advance.",
  },
  {
    service: "office-cleanouts",
    city: "meridian-id",
    intro:
      "Meridian's office parks along Eagle Road and the Ten Mile corridor are mostly ground-level suites, which makes commercial cleanouts here far simpler than downtown ones. Park at the door, load directly, no elevator involved.",
    localNote:
      "Ground-floor Meridian suites mean we can usually do a full office clearout in a single after-hours visit. If your lease ends on a specific date, we'll schedule to land comfortably before it rather than on the day.",
  },
  {
    service: "office-cleanouts",
    city: "eagle-id",
    intro:
      "Eagle commercial spaces skew small and professional — medical, dental, legal, and financial offices rather than open-plan corporate floors. Cleanouts here often involve specialized furniture and equipment alongside the usual desks and chairs.",
    localNote:
      "If your Eagle office held patient or client records, dispose of those through a certified shredding service before we arrive. We haul furniture and equipment, but we can't take responsibility for confidential document destruction.",
  },
  {
    service: "office-cleanouts",
    city: "nampa-id",
    intro:
      "Nampa's commercial cleanouts run to small business and light industrial — downtown storefronts, service businesses, and shop spaces where the cleanout includes both office furniture and whatever the business actually did in back.",
    localNote:
      "Shop and warehouse portions of a Nampa job may include materials we handle differently: tires, batteries, and chemicals all have separate disposal paths. List what's back there when you call so nothing stalls the job on the day.",
  },
  {
    service: "office-cleanouts",
    city: "caldwell-id",
    intro:
      "Caldwell commercial work is largely downtown storefronts and older office buildings, some of which have been repurposed more than once. Cleanouts frequently uncover fixtures and furniture from a previous tenant nobody accounted for.",
    localNote:
      "Older Caldwell buildings sometimes have stairs and no elevator, which changes a second-floor office cleanout considerably. Mention the floor and the access when you book so we bring enough crew.",
  },
  {
    service: "office-cleanouts",
    city: "kuna-id",
    intro:
      "Kuna's commercial base is small and growing, so office cleanouts here tend to be small businesses relocating into larger space rather than shutting down — clearing the old suite as part of an expansion.",
    localNote:
      "If you're moving rather than closing, we can take only what isn't making the trip and leave the rest staged for your movers. Just mark the two groups clearly before the crew arrives.",
  },
  {
    service: "office-cleanouts",
    city: "star-id",
    intro:
      "Star's commercial footprint is still developing, and the office work we do here is mostly small professional suites and home-based businesses that have outgrown a spare room and are consolidating.",
    localNote:
      "Home-office cleanouts in Star are usually a half-truck job at most — desks, shelving, filing cabinets, and old electronics. Electronics go to certified e-waste recycling rather than the landfill regardless of job size.",
  },
  {
    service: "office-cleanouts",
    city: "middleton-id",
    intro:
      "Middleton commercial cleanouts are typically small local businesses along the main corridor. These are straightforward jobs, and the owner is usually on site working alongside the decision rather than delegating it.",
    localNote:
      "We'll work around your open hours in Middleton, including evenings and weekends, so a cleanout doesn't cost you a day of business. Tell us the window and we'll take it.",
  },

  // ------------------------------------------------------------------ Hot tub
  {
    service: "hot-tub-removal",
    city: "boise-id",
    intro:
      "Hot tub removal in Boise is almost always an access puzzle. Older lots are narrow, back yards are reached through a side gate barely wider than a person, and the tub was craned in over the fence twenty years ago by someone who never considered how it would leave.",
    localNote:
      "When a Boise back yard has no gate wide enough, we disassemble the tub in place and carry it out in sections. It's slower than a straight pull, but it doesn't require a crane or taking your fence apart.",
  },
  {
    service: "hot-tub-removal",
    city: "meridian-id",
    intro:
      "Meridian hot tubs are usually newer and set on a concrete pad or a low deck, which makes removal considerably more straightforward than in older parts of the valley. The constraint here is the fence line, not the tub.",
    localNote:
      "Most Meridian subdivisions have gates on the side yard sized for standard access. Measure yours before you call — if it's under six feet, we'll plan to break the tub down rather than roll it out whole.",
  },
  {
    service: "hot-tub-removal",
    city: "eagle-id",
    intro:
      "Eagle has more hot tubs per property than anywhere else we serve, and they're often the most difficult ones to remove: set into elevated decks, positioned well behind the house, or built into a landscaped surround that has to come apart first.",
    localNote:
      "For a tub built into an Eagle deck, we cut and remove the surrounding decking as needed and haul that with it. Send a photo showing how it's set in — that single picture changes the quote more than any other detail.",
  },
  {
    service: "hot-tub-removal",
    city: "nampa-id",
    intro:
      "Nampa hot tub removals are frequently about a unit that stopped working and has been sitting full or half-drained ever since. A dead tub that's held water through a couple of winters is heavier and messier than a working one.",
    localNote:
      "We handle draining as part of the job, so you don't need to deal with it beforehand. Just tell us there's still water in it — a full tub changes both the weight and how we approach the removal.",
  },
  {
    service: "hot-tub-removal",
    city: "caldwell-id",
    intro:
      "Caldwell hot tub jobs often come with a surround, a pergola, or a section of deck that was built around the tub after the fact. Removing the tub usually means dealing with the structure that grew up around it.",
    localNote:
      "If there's a pergola or a deck section that has to come out with the Caldwell tub, include it in the photos. We can haul the whole assembly, but only if the quote accounted for it up front.",
  },
  {
    service: "hot-tub-removal",
    city: "kuna-id",
    intro:
      "Kuna hot tubs sit on everything from new-build patios to gravel pads out on acreage. The removal itself is usually simple; the variable is how far the truck can get from where the tub actually is.",
    localNote:
      "On Kuna acreage we can often drive close to the tub, which makes for a fast job. If the ground is soft or the approach is gravel, mention it and we'll bring the right equipment rather than improvising.",
  },
  {
    service: "hot-tub-removal",
    city: "star-id",
    intro:
      "Star's hot tubs are mostly recent installs on newer properties, so removals here tend to be clean and quick. Usually it's a move, an upgrade, or a decision that the maintenance wasn't worth it.",
    localNote:
      "Newer Star construction typically has wide side-yard gates and concrete pads, which means most tubs here come out whole rather than needing disassembly. That's the cheapest version of this job, and it's the common one here.",
  },
  {
    service: "hot-tub-removal",
    city: "middleton-id",
    intro:
      "Middleton hot tub removals usually happen on properties with room to work — space beside the house, a driveway that reaches the back, and no neighbors close enough to complicate staging a dismantle.",
    localNote:
      "Metal frames and motor components from a Middleton tub go to scrap recycling rather than into the landfill whole. Shell material is disposed of at Pickles Butte, but only the portion that genuinely can't be recovered.",
  },
];

const localPageKey = (service: string, city: string) => `${service}::${city}`;

const LOCAL_PAGE_INDEX = new Map(
  LOCAL_PAGES.map((page) => [localPageKey(page.service, page.city), page]),
);

/**
 * Every service/city combination, as route params. This is the source of truth
 * for which pages exist — the sitemap and generateStaticParams both read it, so
 * they can't drift apart.
 */
export const LOCAL_PAGE_PARAMS = SERVICE_PAGES.flatMap((service) =>
  CITY_PAGES.map((city) => ({ service: service.slug, city: city.slug })),
);

// Adding a service or city without writing its copy would otherwise ship pages
// with missing sections. Failing the build is the cheaper outcome.
const missing = LOCAL_PAGE_PARAMS.filter(
  (param) => !LOCAL_PAGE_INDEX.has(localPageKey(param.service, param.city)),
);
if (missing.length > 0) {
  throw new Error(
    `lib/localPages.ts is missing copy for ${missing.length} service/city ` +
      `combination(s): ${missing.map((m) => `${m.service} in ${m.city}`).join(", ")}. ` +
      `Add an entry to LOCAL_PAGES for each.`,
  );
}

export type ResolvedLocalPage = {
  service: ServicePageContent;
  city: CityPage;
  content: LocalPageContent;
};

/** Returns null for unknown slugs so the route can call notFound(). */
export function getLocalPage(
  serviceSlug: string,
  citySlug: string,
): ResolvedLocalPage | null {
  const service = SERVICE_PAGES.find((s) => s.slug === serviceSlug);
  const city = CITY_PAGES.find((c) => c.slug === citySlug);
  const content = LOCAL_PAGE_INDEX.get(localPageKey(serviceSlug, citySlug));

  if (!service || !city || !content) return null;
  return { service, city, content };
}

/** Path for a service-in-city page. Keeps URL construction in one place. */
export const localPagePath = (serviceSlug: string, citySlug: string) =>
  `/services/${serviceSlug}/${citySlug}`;
