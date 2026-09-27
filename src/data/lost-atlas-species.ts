export type ExtinctSpeciesArticle = {
  slug: string;
  common_name: string;
  scientific_name: string;
  taxonomic_group: string;
  extinction_period: string;
  region: string;
  last_record: string;
  primary_driver: string;
  summary: string;
  habitat: string;
  decline_story: string;
  evidence: string;
  legacy: string;
  image_key: string;
  related_slugs: string[];
  sort_order: number;
};

export const EXTINCT_SPECIES: ExtinctSpeciesArticle[] = [
  {
    slug: "dodo",
    common_name: "Dodo",
    scientific_name: "Raphus cucullatus",
    taxonomic_group: "Bird",
    extinction_period: "Late 17th century",
    region: "Mauritius, Indian Ocean",
    last_record: "The final date is uncertain; the species disappeared by the late 1600s.",
    primary_driver: "Hunting, introduced animals, and habitat change",
    summary:
      "A large flightless pigeon whose island evolution left it vulnerable to new predators and rapid human settlement.",
    habitat:
      "The dodo lived in Mauritius forests, feeding on fallen fruit, seeds, and other plant material. It evolved without the mammalian predators that arrived with people.",
    decline_story:
      "Sailors hunted dodos, while introduced pigs, rats, cats, and macaques raided nests and altered forest habitats. The combined pressure was severe on a bird with a small geographic range and a slow breeding cycle.",
    evidence:
      "Descriptions, illustrations, subfossil bones, and museum specimens support the reconstruction. Historical sightings are uneven, so the exact date of extinction remains debated.",
    legacy:
      "The dodo is a reminder that island species can decline quickly when hunting, invasive species, and habitat loss arrive together.",
    image_key: "cat-evolution",
    related_slugs: ["great-auk", "passenger-pigeon", "carolina-parakeet"],
    sort_order: 1,
  },
  {
    slug: "passenger-pigeon",
    common_name: "Passenger Pigeon",
    scientific_name: "Ectopistes migratorius",
    taxonomic_group: "Bird",
    extinction_period: "Early 20th century",
    region: "Eastern and central North America",
    last_record: "The last known individual, Martha, died in captivity in 1914.",
    primary_driver: "Commercial hunting and large-scale forest clearing",
    summary:
      "Once among North America's most numerous birds, the passenger pigeon collapsed from enormous flocks to extinction within decades.",
    habitat:
      "Passenger pigeons nested and foraged in eastern forests, using mast crops such as acorns and beechnuts. Large communal flocks depended on extensive, connected woodland.",
    decline_story:
      "Telegraph networks and railways let commercial hunters locate and ship birds at industrial scale. Forest clearing removed nesting and feeding grounds, while population collapse disrupted the flocking behavior that supported breeding.",
    evidence:
      "Martha's preserved body, museum skins, historical newspapers, and eyewitness accounts document the final years. The last confirmed wild bird was killed in 1901.",
    legacy:
      "Extreme abundance is not protection from extinction when exploitation continues faster than a population can recover.",
    image_key: "cat-organisms",
    related_slugs: ["dodo", "carolina-parakeet", "labrador-duck"],
    sort_order: 2,
  },
  {
    slug: "thylacine",
    common_name: "Thylacine",
    scientific_name: "Thylacinus cynocephalus",
    taxonomic_group: "Marsupial",
    extinction_period: "20th century",
    region: "Tasmania; formerly mainland Australia and New Guinea",
    last_record: "The last known captive thylacine died at Hobart Zoo in 1936.",
    primary_driver: "Persecution, habitat pressure, and small-population vulnerability",
    summary:
      "The thylacine was a striped carnivorous marsupial remembered as the Tasmanian tiger or wolf.",
    habitat:
      "Thylacines occupied forests, grasslands, and scrub across Tasmania. They were solitary or paired hunters with a broad carnivore role in island ecosystems.",
    decline_story:
      "Bounty schemes and conflict with livestock owners drove sustained killing. Habitat changes and the small, isolated Tasmanian population reduced resilience; the relative contribution of disease remains uncertain.",
    evidence:
      "Skins, skeletons, photographs, film footage, and preserved specimens document the species. Reports after 1936 have not produced a verified living animal.",
    legacy:
      "The thylacine shows how persecution can eliminate a poorly understood predator before its ecological role is fully documented.",
    image_key: "cat-organisms",
    related_slugs: ["warrah", "caribbean-monk-seal", "quagga"],
    sort_order: 3,
  },
  {
    slug: "great-auk",
    common_name: "Great Auk",
    scientific_name: "Pinguinus impennis",
    taxonomic_group: "Bird",
    extinction_period: "19th century",
    region: "North Atlantic coasts and islands",
    last_record: "The last confirmed pair was killed on Eldey, Iceland, in 1844.",
    primary_driver: "Hunting for meat, oil, feathers, and museum specimens",
    summary:
      "A flightless seabird adapted to cold North Atlantic waters and vulnerable on its few breeding islands.",
    habitat:
      "Great auks fed at sea and came ashore in dense colonies on isolated rocky islands. Their breeding range was naturally limited, making each colony important.",
    decline_story:
      "People hunted auks for food and oil for centuries; demand later rose for feathers and specimens. As populations shrank, collectors targeted the remaining birds and eggs.",
    evidence:
      "Museum skins, eggs, bones, and contemporary accounts survive. The 1844 Eldey event is supported by testimony from the hunters and later investigation.",
    legacy:
      "Protecting a species requires protecting breeding sites before scarcity makes every surviving colony a target.",
    image_key: "cat-evolution",
    related_slugs: ["dodo", "passenger-pigeon", "labrador-duck"],
    sort_order: 4,
  },
  {
    slug: "steller-sea-cow",
    common_name: "Steller's Sea Cow",
    scientific_name: "Hydrodamalis gigas",
    taxonomic_group: "Marine mammal",
    extinction_period: "18th century",
    region: "Commander Islands, North Pacific",
    last_record: "The last animals were killed by 1768, decades after scientific description.",
    primary_driver: "Intensive hunting by visiting sailors",
    summary:
      "A very large, slow-moving relative of the dugong that grazed kelp in cold northern seas.",
    habitat:
      "Steller's sea cows lived in shallow coastal waters around the Commander Islands, feeding on kelp beds. Their coastal habits made them accessible to ship crews.",
    decline_story:
      "The species was described by Georg Wilhelm Steller after the 1741 expedition. Seafarers hunted it for meat and fat, and the isolated population was exhausted within about three decades.",
    evidence:
      "Steller's field notes, later travel accounts, and subfossil remains provide evidence. No complete skeleton is known, so reconstructions combine written descriptions with related sirenians.",
    legacy:
      "A large body size did not prevent rapid extinction when a small range met sustained, efficient hunting.",
    image_key: "sci-earth",
    related_slugs: ["caribbean-monk-seal", "dodo", "thylacine"],
    sort_order: 5,
  },
  {
    slug: "quagga",
    common_name: "Quagga",
    scientific_name: "Equus quagga quagga",
    taxonomic_group: "Mammal",
    extinction_period: "19th century",
    region: "South African grasslands and Karoo",
    last_record: "The last known captive quagga died in Amsterdam in 1883.",
    primary_driver: "Hunting and competition with livestock",
    summary:
      "A plains zebra subspecies with bold stripes on the forebody and a plainer brown hindquarter.",
    habitat:
      "Quaggas grazed open grassland and the drier Karoo region. Seasonal movement tracked water and forage across a landscape increasingly occupied by farms.",
    decline_story:
      "Settlers hunted quaggas for hides and meat and killed them where they competed with domestic stock. No managed wild population remained by the late nineteenth century.",
    evidence:
      "Museum skins, photographs, paintings, and historical descriptions document coat patterns and range. DNA analysis supports its close relationship to plains zebras.",
    legacy:
      "The quagga also illustrates that extinction can erase a distinctive local population within a species complex.",
    image_key: "cat-evolution",
    related_slugs: ["aurochs", "thylacine", "carolina-parakeet"],
    sort_order: 6,
  },
  {
    slug: "aurochs",
    common_name: "Aurochs",
    scientific_name: "Bos primigenius",
    taxonomic_group: "Mammal",
    extinction_period: "17th century",
    region: "Europe, western Asia, and North Africa",
    last_record: "The last recorded aurochs died in Poland in 1627.",
    primary_driver: "Habitat loss, hunting, and competition with livestock",
    summary: "The aurochs was a wild cattle species and the ancestor of domestic cattle.",
    habitat:
      "Aurochs used woodland, forest edges, and open pasture across a vast range. As agriculture expanded, wild herds became isolated in managed forests.",
    decline_story:
      "Clearing and settlement reduced habitat while hunting removed animals. By the last centuries, surviving herds were protected in royal forests but remained vulnerable to disease and limited numbers.",
    evidence:
      "Archaeological bones, cave art, historical records, and genetic comparisons with cattle describe its biology and domestication history.",
    legacy:
      "Domestication preserved some aurochs ancestry, but it did not preserve the wild species or its ecological role.",
    image_key: "cat-organisms",
    related_slugs: ["quagga", "syrian-wild-ass", "irish-elk"],
    sort_order: 7,
  },
  {
    slug: "carolina-parakeet",
    common_name: "Carolina Parakeet",
    scientific_name: "Conuropsis carolinensis",
    taxonomic_group: "Bird",
    extinction_period: "20th century",
    region: "Eastern United States and the Mississippi basin",
    last_record: "The last captive bird died in 1918; the species was later declared extinct.",
    primary_driver: "Forest conversion, persecution, and collection",
    summary:
      "North America's only native parrot species ranged through river forests and open woodlands.",
    habitat:
      "Carolina parakeets nested in mature forests and foraged in flocks along rivers. They ate seeds, fruit, and crops, bringing them into conflict with farmers.",
    decline_story:
      "Widespread tree clearing removed nesting sites, while farmers and collectors killed birds. Their flocking behavior made large groups easy to locate and shoot.",
    evidence:
      "Museum specimens, paintings, captive photographs, and naturalists' notes document the species. The Cincinnati Zoo records the last known captive individual, Incas.",
    legacy:
      "Even widespread, social species can disappear when habitat conversion and direct killing act together.",
    image_key: "cat-organisms",
    related_slugs: ["passenger-pigeon", "huia", "dodo"],
    sort_order: 8,
  },
  {
    slug: "moa",
    common_name: "Moa",
    scientific_name: "Dinornithiformes",
    taxonomic_group: "Birds (multiple species)",
    extinction_period: "15th century (approximate)",
    region: "Aotearoa New Zealand",
    last_record:
      "Moa disappeared within a few centuries of human settlement; dates differ among species and islands.",
    primary_driver: "Hunting and rapid ecological change after settlement",
    summary:
      "Moa were several lineages of large, flightless birds, including the tallest known birds.",
    habitat:
      "Different moa species occupied forests, shrublands, and grasslands across New Zealand. Their size and diversity reflect varied island habitats.",
    decline_story:
      "Human hunting, egg collection, and habitat burning placed pressure on slow-breeding populations. The speed of decline appears to have varied among species and regions.",
    evidence:
      "Thousands of bones, eggshell fragments, coprolites, and ancient DNA reveal body size, diet, and distribution. Radiocarbon dates help distinguish regional extinction timelines.",
    legacy:
      "Moa show why an atlas should treat a group of related extinctions separately rather than invent one universal last date.",
    image_key: "cat-evolution",
    related_slugs: ["huia", "elephant-bird", "dodo"],
    sort_order: 9,
  },
  {
    slug: "golden-toad",
    common_name: "Golden Toad",
    scientific_name: "Incilius periglenes",
    taxonomic_group: "Amphibian",
    extinction_period: "Late 20th century",
    region: "Monteverde cloud forest, Costa Rica",
    last_record: "The last confirmed observations were in 1989.",
    primary_driver: "Rapid environmental change; exact causes remain debated",
    summary: "A vividly colored toad known from a small, high-elevation area in Costa Rica.",
    habitat:
      "Golden toads bred in temporary pools in the humid Monteverde cloud forest. Their narrow range made them sensitive to local changes in rainfall and temperature.",
    decline_story:
      "After mass breeding events in the 1980s, adults and eggs became scarce. Climate variability and infectious disease have both been investigated; no single explanation accounts for every detail.",
    evidence:
      "Museum specimens and field surveys establish the species and its former range. Repeated searches since the final observations have not found a surviving population.",
    legacy:
      "The case highlights how climate, pathogens, and small range size can interact, while reminding researchers to label uncertain causes honestly.",
    image_key: "sci-earth",
    related_slugs: ["bramble-cay-melomys", "tecopa-pupfish", "pinta-tortoise"],
    sort_order: 10,
  },
  {
    slug: "pinta-tortoise",
    common_name: "Pinta Island Tortoise",
    scientific_name: "Chelonoidis abingdonii",
    taxonomic_group: "Reptile",
    extinction_period: "21st century",
    region: "Pinta Island, Galapagos",
    last_record: "Lonesome George, the last known purebred individual, died in 2012.",
    primary_driver: "Hunting and ecological damage from introduced goats",
    summary:
      "A giant tortoise from one Galapagos island became known through its final individual.",
    habitat:
      "Pinta tortoises used island vegetation and seasonal resources. Their slow growth and long generation time made population recovery difficult.",
    decline_story:
      "Whalers and settlers harvested tortoises for food, and introduced goats heavily altered vegetation. Conservationists removed goats and searched for additional tortoises, but none were confirmed.",
    evidence:
      "Lonesome George's preserved body, genetic studies, and field surveys document the taxon. Hybrid descendants may retain some Pinta ancestry, but the purebred subspecies is considered extinct.",
    legacy:
      "The final individual became a global symbol for conservation, but his story also reflects the long work needed before a species reaches that point.",
    image_key: "cat-organisms",
    related_slugs: ["dodo", "golden-toad", "pyrenean-ibex"],
    sort_order: 11,
  },
  {
    slug: "pyrenean-ibex",
    common_name: "Pyrenean Ibex",
    scientific_name: "Capra pyrenaica pyrenaica",
    taxonomic_group: "Mammal (subspecies)",
    extinction_period: "2000",
    region: "The Pyrenees, between Spain and France",
    last_record:
      "The last known individual, Celia, died in 2000; a cloned kid survived only briefly in 2003.",
    primary_driver: "Hunting, habitat fragmentation, and small-population effects",
    summary:
      "A mountain ibex subspecies whose final individual became part of an early cloning attempt.",
    habitat:
      "Pyrenean ibex used steep, rocky mountain terrain and alpine vegetation. Seasonal movement linked feeding areas and safe elevations.",
    decline_story:
      "Hunting reduced numbers over generations, while the remaining population became isolated. A cloned individual was born in 2003 but died shortly after birth due to lung defects.",
    evidence:
      "Celia's preserved tissues, photographs, and genetic material are held by conservation and research institutions. The cloning attempt demonstrated that a cell sample is not the same as a recoverable population.",
    legacy:
      "De-extinction experiments cannot replace habitat protection, genetic diversity, or a living breeding population.",
    image_key: "cat-evolution",
    related_slugs: ["pinta-tortoise", "aurochs", "syrian-wild-ass"],
    sort_order: 12,
  },
  {
    slug: "caribbean-monk-seal",
    common_name: "Caribbean Monk Seal",
    scientific_name: "Neomonachus tropicalis",
    taxonomic_group: "Marine mammal",
    extinction_period: "20th century",
    region: "Caribbean Sea and Gulf of Mexico",
    last_record:
      "The last widely accepted colony was observed in 1952; the species was declared extinct in 2008.",
    primary_driver: "Commercial hunting and disturbance at haul-out sites",
    summary:
      "The only seal native to the Caribbean, once distributed across warm coastal waters and islands.",
    habitat:
      "Caribbean monk seals hauled out on beaches and remote islands and foraged in surrounding waters. Their breeding sites were exposed to human traffic and harvest.",
    decline_story:
      "Hunters killed seals for oil and fishers viewed them as competitors. Repeated disturbance and killing reduced colonies, while few systematic surveys were conducted as numbers fell.",
    evidence:
      "Historical logs, museum specimens, photographs, and the 1952 observation at Serranilla Bank support the species record. Later expeditions did not verify a living population.",
    legacy:
      "Marine extinctions can remain unnoticed when monitoring is sparse and animals spend much of their lives at sea.",
    image_key: "sci-earth",
    related_slugs: ["steller-sea-cow", "thylacine", "great-auk"],
    sort_order: 13,
  },
  {
    slug: "bramble-cay-melomys",
    common_name: "Bramble Cay Melomys",
    scientific_name: "Melomys rubicola",
    taxonomic_group: "Mammal (rodent)",
    extinction_period: "21st century",
    region: "Bramble Cay, Torres Strait, Australia",
    last_record:
      "The last confirmed survey record was in 2009; the species was declared extinct in 2016.",
    primary_driver: "Loss of habitat from inundation and erosion, linked to sea-level rise",
    summary:
      "A small rodent restricted to a tiny, low-lying coral cay at the northern edge of Australia.",
    habitat:
      "The melomys depended on dense grass and herb cover on Bramble Cay for food and shelter. The island's low elevation left its habitat exposed to storm overwash and rising seas.",
    decline_story:
      "Vegetation cover shrank as erosion and saltwater inundation increased. Surveys found no animals after 2009, and the remaining habitat was too small to support a resilient population.",
    evidence:
      "Survey records, habitat measurements, and historical specimens document the decline. It is widely cited as the first mammal extinction attributed primarily to human-caused climate change.",
    legacy:
      "Species on low islands can lose their entire range when the habitat itself disappears.",
    image_key: "sci-earth",
    related_slugs: ["golden-toad", "tecopa-pupfish", "caribbean-monk-seal"],
    sort_order: 14,
  },
  {
    slug: "chinese-paddlefish",
    common_name: "Chinese Paddlefish",
    scientific_name: "Psephurus gladius",
    taxonomic_group: "Fish",
    extinction_period: "21st century",
    region: "Yangtze River basin, China",
    last_record:
      "The last confirmed sighting was in 2003; extinction was assessed in 2019 and published in 2020.",
    primary_driver: "Overfishing, dams, and disrupted migration",
    summary:
      "A giant migratory fish with a long rostrum, dependent on the connected Yangtze river system.",
    habitat:
      "Chinese paddlefish moved through the Yangtze and its tributaries, using long river reaches for feeding and spawning. Dams divided this migration corridor.",
    decline_story:
      "Intensive fishing removed adults, while river engineering fragmented habitat and blocked access to spawning grounds. The species was rarely detected before the final confirmed record.",
    evidence:
      "Historical catch records, preserved specimens, and later surveys support the extinction assessment. Large river species can be difficult to detect, so absence estimates required broad systematic evaluation.",
    legacy:
      "Freshwater biodiversity depends on connected rivers; infrastructure planning must account for migration and breeding cycles.",
    image_key: "sci-earth",
    related_slugs: ["tecopa-pupfish", "bramble-cay-melomys", "steller-sea-cow"],
    sort_order: 15,
  },
  {
    slug: "woolly-mammoth",
    common_name: "Woolly Mammoth",
    scientific_name: "Mammuthus primigenius",
    taxonomic_group: "Mammal",
    extinction_period: "Holocene; last island populations about 4,000 years ago",
    region: "Northern Eurasia and North America; later Wrangel Island",
    last_record:
      "The final known population survived on Wrangel Island until roughly 4,000 years ago.",
    primary_driver: "Climate-driven habitat loss and human hunting",
    summary: "A cold-adapted elephant that ranged across the mammoth steppe during the Ice Age.",
    habitat:
      "Woolly mammoths grazed open, cold steppe-tundra. As climates warmed, forests and wetlands replaced much of this grass-rich ecosystem.",
    decline_story:
      "Populations contracted as suitable habitat fragmented. Human hunting added pressure in some regions; small isolated island populations persisted long after mainland groups disappeared.",
    evidence:
      "Permafrost-preserved carcasses, tusks, bones, cave art, and ancient DNA reveal diet, migration, and population change. Radiocarbon dates distinguish the last island refuges.",
    legacy:
      "The mammoth's long decline shows that extinction can be a regional process stretched across thousands of years.",
    image_key: "cat-evolution",
    related_slugs: ["cave-lion", "irish-elk", "elephant-bird"],
    sort_order: 16,
  },
  {
    slug: "cave-lion",
    common_name: "Cave Lion",
    scientific_name: "Panthera spelaea",
    taxonomic_group: "Mammal",
    extinction_period: "Late Pleistocene",
    region: "Europe and northern Asia",
    last_record:
      "The species disappeared near the end of the last Ice Age; dates vary across its range.",
    primary_driver: "Changing climate and prey communities, with human pressure also considered",
    summary:
      "A large Ice Age cat known from fossils and striking images made by people in Paleolithic caves.",
    habitat:
      "Cave lions occupied open cold-steppe environments and hunted large herbivores. Their range tracked the distribution of these ecosystems and prey.",
    decline_story:
      "Warming climates transformed open steppe into forest and fragmented prey habitat. Human hunting and competition may have added pressure, but the relative roles remain debated.",
    evidence:
      "Fossils, cave paintings, and ancient DNA distinguish cave lions from modern lions and provide evidence of their distribution and relationships.",
    legacy:
      "Prehistoric extinction studies combine fossils, genetics, and climate records; no single signal should be treated as a complete explanation.",
    image_key: "cat-evolution",
    related_slugs: ["woolly-mammoth", "irish-elk", "thylacine"],
    sort_order: 17,
  },
  {
    slug: "irish-elk",
    common_name: "Irish Elk (Giant Deer)",
    scientific_name: "Megaloceros giganteus",
    taxonomic_group: "Mammal",
    extinction_period: "Late Pleistocene to early Holocene",
    region: "Europe and parts of northern Asia",
    last_record:
      "The latest populations vanished several thousand years ago; the species was not limited to Ireland.",
    primary_driver: "Environmental change and loss of suitable open habitat",
    summary: "A giant deer famous for immense antlers, whose range extended well beyond Ireland.",
    habitat:
      "Giant deer used open woodland and grassland mosaics. Their large antlers are sometimes linked to display and competition, not simply a physical burden.",
    decline_story:
      "Post-Ice-Age vegetation shifts changed forage and habitat. The timing varied across the range, and the roles of climate, nutrition, and human activity remain subjects of research.",
    evidence:
      "Well-preserved skeletons, antlers, and radiocarbon dates reveal anatomy and regional persistence. The name Irish elk reflects discovery history rather than its full geographic range.",
    legacy:
      "A memorable common name can obscure the true distribution and ecological story of a species.",
    image_key: "cat-evolution",
    related_slugs: ["woolly-mammoth", "cave-lion", "aurochs"],
    sort_order: 18,
  },
  {
    slug: "huia",
    common_name: "Huia",
    scientific_name: "Heteralocha acutirostris",
    taxonomic_group: "Bird",
    extinction_period: "Early 20th century",
    region: "North Island, Aotearoa New Zealand",
    last_record: "The last widely accepted sighting was in 1907.",
    primary_driver: "Forest loss and hunting for distinctive tail feathers",
    summary:
      "A wattlebird with striking sexual dimorphism: males and females had differently shaped bills.",
    habitat:
      "Huia lived in native forests of New Zealand's North Island, feeding on insects and other forest resources. It relied on intact, mature habitat.",
    decline_story:
      "Deforestation reduced its range, while hunting and collecting intensified demand for its feathers and specimens. Its cultural significance did not prevent exploitation.",
    evidence:
      "Museum skins, photographs, sound descriptions, and Māori knowledge document the species. Reports after the accepted last records remain unverified.",
    legacy:
      "Species conservation must respect Indigenous knowledge and cultural relationships while preventing commercial demand from turning them into targets.",
    image_key: "cat-organisms",
    related_slugs: ["carolina-parakeet", "moa", "dodo"],
    sort_order: 19,
  },
  {
    slug: "dusky-seaside-sparrow",
    common_name: "Dusky Seaside Sparrow",
    scientific_name: "Ammospiza maritima nigrescens",
    taxonomic_group: "Bird (subspecies)",
    extinction_period: "Late 20th century",
    region: "Salt marshes of the St. Johns River, Florida",
    last_record: "The last known individual, Orange Band, died in 1987.",
    primary_driver: "Salt-marsh destruction and altered water management",
    summary: "A dark-plumaged sparrow subspecies restricted to a narrow stretch of Florida marsh.",
    habitat:
      "The sparrow nested in cordgrass and other vegetation in tidal salt marsh. Its small range depended on marsh hydrology and plant structure.",
    decline_story:
      "Wetland drainage, mosquito-control projects, and altered water levels degraded habitat. Captive breeding began after numbers had already become critically low.",
    evidence:
      "The last individual was photographed and documented in captivity. Museum specimens and surveys describe the former range and distinct plumage.",
    legacy:
      "Habitat engineering can erase a subspecies even when conservation action begins, if intervention comes after the population bottleneck.",
    image_key: "sci-earth",
    related_slugs: ["passenger-pigeon", "carolina-parakeet", "bramble-cay-melomys"],
    sort_order: 20,
  },
  {
    slug: "labrador-duck",
    common_name: "Labrador Duck",
    scientific_name: "Camptorhynchus labradorius",
    taxonomic_group: "Bird",
    extinction_period: "19th century",
    region: "North American Atlantic coast",
    last_record: "The last confirmed specimen was collected in 1878.",
    primary_driver: "Likely a combination of hunting and changes to coastal feeding habitat",
    summary:
      "A sea duck with specialized feeding structures, poorly understood even before its extinction.",
    habitat:
      "Labrador ducks wintered along the Atlantic coast and fed on shellfish in shallow bays. Their breeding range in the north is less certain.",
    decline_story:
      "The species was hunted, but its decline is not fully explained. Changes in shellfish abundance and coastal habitats may also have affected a naturally uncommon bird.",
    evidence:
      "Fewer than a modest number of museum specimens and scattered historical descriptions survive. The sparse record makes cause-of-extinction claims especially uncertain.",
    legacy:
      "When a species is poorly documented, extinction can erase information before scientists understand its ecology.",
    image_key: "cat-evolution",
    related_slugs: ["great-auk", "passenger-pigeon", "carolina-parakeet"],
    sort_order: 21,
  },
  {
    slug: "tecopa-pupfish",
    common_name: "Tecopa Pupfish",
    scientific_name: "Cyprinodon nevadensis calidae",
    taxonomic_group: "Fish (subspecies)",
    extinction_period: "Late 20th century",
    region: "Tecopa Hot Springs, California, United States",
    last_record: "The subspecies was declared extinct in 1981.",
    primary_driver: "Modification and merging of the hot-spring habitat",
    summary:
      "A small desert fish adapted to the unusually warm, mineral-rich waters of two springs.",
    habitat:
      "Tecopa pupfish lived in narrow spring channels with distinctive temperature and water chemistry. Their range was measured in a few connected pools.",
    decline_story:
      "Bathhouse development altered spring channels and merged waters with different temperatures. The resulting conditions and competition from introduced fish eliminated the remaining population.",
    evidence:
      "Surveys and preserved specimens document the fish and its restricted habitat. Its loss is linked to specific physical changes at the springs.",
    legacy:
      "Specialized species can depend on a single microhabitat; small changes to that place can cause global extinction.",
    image_key: "sci-earth",
    related_slugs: ["chinese-paddlefish", "golden-toad", "bramble-cay-melomys"],
    sort_order: 22,
  },
  {
    slug: "warrah",
    common_name: "Warrah (Falkland Islands Wolf)",
    scientific_name: "Dusicyon australis",
    taxonomic_group: "Mammal",
    extinction_period: "19th century",
    region: "Falkland Islands",
    last_record: "The last known warrah was killed in 1876.",
    primary_driver: "Persecution by settlers and lack of refuge on small islands",
    summary:
      "The only native land mammal of the Falkland Islands, encountered by early European explorers.",
    habitat:
      "Warrahs moved through island grasslands and coastal environments. With no dense forests or large uninhabited refuges, they were exposed to settlers across their range.",
    decline_story:
      "Settlers killed warrahs to protect livestock and for their pelts. The species had no nearby mainland population from which numbers could recover.",
    evidence:
      "Museum skins, bones, and travel accounts document its appearance and distribution. Charles Darwin recorded observations during the Beagle voyage.",
    legacy:
      "Island endemics can be eliminated across their whole range by repeated local persecution.",
    image_key: "cat-organisms",
    related_slugs: ["thylacine", "caribbean-monk-seal", "aurochs"],
    sort_order: 23,
  },
  {
    slug: "elephant-bird",
    common_name: "Elephant Bird",
    scientific_name: "Aepyornithidae",
    taxonomic_group: "Birds (family)",
    extinction_period: "Holocene; exact final dates uncertain",
    region: "Madagascar",
    last_record:
      "The family disappeared after human settlement; dates and species timelines remain under study.",
    primary_driver: "Hunting, egg collection, and habitat change",
    summary:
      "Several giant, flightless bird species lived on Madagascar, producing some of the largest known eggs.",
    habitat:
      "Elephant birds occupied different habitats across Madagascar, including forest and open areas. Their large eggs and slow reproduction made populations vulnerable to sustained harvest.",
    decline_story:
      "People used birds and eggs for food, while landscape change reduced habitat. The relative roles and timing differ among elephant-bird species and remain an active research area.",
    evidence:
      "Subfossil skeletons, eggshells, ancient DNA, and archaeological sites establish their diversity and distribution. New discoveries continue to refine the family tree.",
    legacy:
      "A common name can describe a family rather than one species; careful taxonomy keeps the atlas scientifically honest.",
    image_key: "cat-evolution",
    related_slugs: ["moa", "woolly-mammoth", "dodo"],
    sort_order: 24,
  },
  {
    slug: "syrian-wild-ass",
    common_name: "Syrian Wild Ass",
    scientific_name: "Equus hemionus hemippus",
    taxonomic_group: "Mammal (subspecies)",
    extinction_period: "20th century",
    region: "Syria, Iraq, and the Arabian Peninsula",
    last_record:
      "The last known captive animal died in Vienna in 1928; wild populations disappeared earlier.",
    primary_driver: "Hunting, capture, and loss of open range",
    summary: "A small, fast wild equid adapted to arid grassland and desert margins.",
    habitat:
      "Syrian wild asses used open steppe and desert-edge habitats, moving widely in search of water and seasonal forage.",
    decline_story:
      "Firearms and motorized hunting made the animals easier to pursue. Conflict, capture, and expanding settlement further reduced the already fragmented range.",
    evidence:
      "Museum specimens, photographs, and historical accounts preserve details of its size and range. Taxonomic work treats it as a subspecies of the Asiatic wild ass.",
    legacy:
      "Fast-moving animals still need connected ranges and refuges; speed alone cannot offset persistent human pressure.",
    image_key: "cat-organisms",
    related_slugs: ["aurochs", "quagga", "pyrenean-ibex"],
    sort_order: 25,
  },
];
