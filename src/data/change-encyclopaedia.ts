import type { ArticleRow, Subject, TopicRow } from "@/lib/content";

export const CHANGE_SUBJECT: Subject = {
  id: "sub-change-encyclopaedia",
  slug: "change-encyclopaedia",
  title: "Change Encyclopaedia",
  description:
    "An encyclopaedia of the changes Earth and Earth-like worlds can undergo, from geological and climatic shifts to biological, atmospheric and human-driven change.",
  icon: "Globe",
  image_key: "sci-earth",
  image_url: null,
  sort: 10,
};

const TOPIC_DEFS = [
  ["geological-change", "Geological Change", "Plate movement, mountain building, erosion, volcanism and the long-term reshaping of Earth's surface."],
  ["climate-change", "Climate Change", "Natural and human-driven changes in temperature, rainfall, ice, oceans and the climate system."],
  ["atmospheric-change", "Atmospheric Change", "Changes to atmospheric composition, circulation, chemistry and the conditions that shape weather and climate."],
  ["ocean-change", "Ocean Change", "Changes in ocean temperature, chemistry, circulation, sea level, ice and marine environments."],
  ["biological-change", "Biological Change", "Evolution, extinction, adaptation, migration and ecological changes across living systems."],
  ["ecosystem-change", "Ecosystem Change", "How habitats and ecological communities change through disturbance, succession, species loss and recovery."],
  ["human-driven-change", "Human-Driven Change", "Changes caused or accelerated by cities, agriculture, industry, resource use, pollution and land transformation."],
  ["earth-system-change", "Earth-System Change", "Interactions between the atmosphere, hydrosphere, geosphere, biosphere and cryosphere as one connected system."],
  ["extreme-events", "Extreme Events", "Earthquakes, volcanic eruptions, floods, storms, wildfires, droughts and other rapid changes."],
  ["future-earths", "Future Earths", "Possible future states of Earth and Earth-like planets under different physical, biological and human conditions."],
] as const;

export const CHANGE_TOPICS: TopicRow[] = TOPIC_DEFS.map(([slug, title, blurb], index) => ({
  id: `change-topic-${slug}`,
  section_id: null,
  subject_id: CHANGE_SUBJECT.id,
  subject_slug: CHANGE_SUBJECT.slug,
  slug,
  title,
  blurb,
  body: blurb,
  image_url: null,
  sort: index + 1,
}));

type ChangeSection = {
  heading: string;
  paragraphs: string[];
  cards?: { title: string; text: string }[];
};

function article(
  id: string,
  title: string,
  excerpt: string,
  topic_slug: string,
  minutes: number,
  sections: ChangeSection[],
): ArticleRow {
  return {
    id: `change-encyclopaedia-${id}`,
    slug: `change-encyclopaedia-${id}`,
    title,
    excerpt,
    body: JSON.stringify({
      version: 1,
      tags: ["Change Encyclopaedia", "Earth", "Scientific reference"],
      facts: [
        { label: "Encyclopaedia", value: "Change Encyclopaedia" },
        { label: "Topic", value: CHANGE_TOPICS.find((topic) => topic.slug === topic_slug)?.title ?? topic_slug },
        { label: "Focus", value: "How Earth can change" },
        { label: "Format", value: "Scientific reference" },
      ],
      overview: [
        excerpt,
        "The Change Encyclopaedia examines Earth as a changing planetary system. Articles distinguish gradual processes from rapid events and natural drivers from changes strongly influenced by human activity.",
      ],
      sections,
      references: [
        "Change Encyclopaedia — Ted's Lab scientific reference collection.",
        "For quantitative claims, consult current geological, atmospheric, oceanographic and ecological datasets and peer-reviewed research.",
      ],
    }),
    minutes,
    tone: "scientific",
    subject_slug: CHANGE_SUBJECT.slug,
    section_slug: null,
    topic_slug,
    image_key: "sci-earth",
    image_url: null,
    video_url: null,
    published: true,
    status: "published",
    sort: 300 + minutes,
  };
}

export const CHANGE_ARTICLES: ArticleRow[] = [
  article(
    "earth-as-a-changing-system",
    "Earth as a Changing Planetary System",
    "Earth is not static: its rocks, oceans, atmosphere, climate and living systems continuously change and interact.",
    "earth-system-change",
    8,
    [
      {
        heading: "What changes on Earth?",
        paragraphs: [
          "Earth changes across many timescales. A river can alter a valley over years to centuries, tectonic plates can rearrange continents over millions of years, and ecosystems can shift within seasons or generations.",
          "These processes are connected. A volcanic eruption can alter atmospheric composition, climate can influence ice and sea level, and biological activity can change soils, gases and nutrient cycles.",
        ],
        cards: [
          { title: "Slow change", text: "Plate motion, mountain building, erosion and long-term climate shifts can transform landscapes over thousands to millions of years." },
          { title: "Rapid change", text: "Earthquakes, eruptions, floods, fires and storms can alter environments over minutes to years." },
          { title: "Connected change", text: "Changes in one Earth system can propagate into others through feedbacks and exchanges of matter and energy." },
        ],
      },
      {
        heading: "Timescales and feedbacks",
        paragraphs: [
          "Understanding Earth requires comparing processes that operate at very different rates. Some changes accumulate gradually, while others occur when a system crosses a threshold or experiences a sudden disturbance.",
          "Feedbacks can amplify or dampen change. For example, changing ice cover can alter how much solar energy is reflected, while vegetation can influence water movement, carbon storage and local climate.",
        ],
      },
      {
        heading: "Why this encyclopaedia matters",
        paragraphs: [
          "The Change Encyclopaedia provides a framework for understanding what kinds of changes Earth can experience, what causes them, how they interact and how scientists reconstruct or monitor them.",
        ],
      },
    ],
  ),
  article(
    "plate-tectonics-and-changing-continents",
    "Plate Tectonics and Changing Continents",
    "Plate tectonics continuously rearranges Earth's crust, opening oceans, closing them, building mountains and generating earthquakes and volcanoes.",
    "geological-change",
    9,
    [
      {
        heading: "A moving outer Earth",
        paragraphs: [
          "Earth's lithosphere is divided into large and smaller tectonic plates that move relative to one another. Their interactions reshape the surface over geological time.",
          "At divergent boundaries plates move apart; at convergent boundaries plates collide or one plate can descend beneath another; at transform boundaries plates slide laterally past one another.",
        ],
        cards: [
          { title: "Mountains", text: "Continental collision and other tectonic processes can build and uplift mountain ranges." },
          { title: "Oceans", text: "Seafloor spreading can create new oceanic crust while subduction removes older crust." },
          { title: "Earthquakes", text: "Stress released along faults can produce earthquakes and permanently alter landscapes." },
        ],
      },
      {
        heading: "Continents through deep time",
        paragraphs: [
          "Continents have repeatedly assembled, fragmented and migrated. The positions of land and ocean therefore look very different when reconstructed across geological time.",
        ],
      },
    ],
  ),
  article(
    "erosion-weathering-and-landscape-change",
    "Weathering, Erosion and Landscape Change",
    "Rock is continuously broken down, transported and deposited by water, wind, ice, gravity and chemical reactions.",
    "geological-change",
    7,
    [
      {
        heading: "Breaking rock down",
        paragraphs: [
          "Weathering changes rock at or near Earth's surface. Physical weathering can break material apart, while chemical weathering changes minerals through reactions with water and gases.",
          "Erosion moves weathered material. Rivers, glaciers, waves, wind and gravity transport sediment from one location to another.",
        ],
      },
      {
        heading: "Landscapes are built as well as destroyed",
        paragraphs: [
          "Erosion removes material from some places while deposition builds deltas, beaches, floodplains, dunes and other landforms elsewhere. Over long periods these processes can substantially reshape terrain.",
        ],
        cards: [
          { title: "Water", text: "Rivers and rainfall can carve channels, transport sediment and reshape slopes." },
          { title: "Ice", text: "Glaciers can erode valleys and transport large quantities of rock." },
          { title: "Wind", text: "Wind can move fine sediment and form dunes and other aeolian landforms." },
        ],
      },
    ],
  ),
  article(
    "climate-change-and-earths-energy-balance",
    "Climate Change and Earth's Energy Balance",
    "Climate changes when the balance of incoming and outgoing energy and the behaviour of the atmosphere, oceans, land and ice change.",
    "climate-change",
    10,
    [
      {
        heading: "What climate change means",
        paragraphs: [
          "Climate describes patterns of temperature, precipitation, winds and related conditions over long periods. Climate change is a sustained shift in those patterns rather than a single unusual weather event.",
          "Earth's climate responds to changes in incoming sunlight, atmospheric composition, surface properties, ocean circulation, ice and other factors.",
        ],
        cards: [
          { title: "Atmosphere", text: "Gases in the atmosphere affect how energy moves through the climate system." },
          { title: "Oceans", text: "Oceans store and transport large amounts of heat and carbon, influencing climate over many timescales." },
          { title: "Ice", text: "Snow and ice reflect sunlight and can change as temperatures and precipitation patterns shift." },
        ],
      },
      {
        heading: "Natural and human influences",
        paragraphs: [
          "Earth's climate has changed naturally throughout its history. In the modern era, human activities have added major influences, particularly through greenhouse-gas emissions, land-use change and other alterations to the atmosphere and surface.",
          "Climate change can affect sea level, ecosystems, extreme-event probabilities, water availability and many other parts of the Earth system.",
        ],
      },
    ],
  ),
  article(
    "atmospheric-composition-change",
    "How Earth's Atmosphere Can Change",
    "Earth's atmosphere can change in composition, temperature, circulation and chemistry, with consequences for climate, weather and life.",
    "atmospheric-change",
    8,
    [
      {
        heading: "A dynamic atmosphere",
        paragraphs: [
          "The atmosphere is continually exchanged with the oceans, land and biosphere. Volcanic emissions, biological activity, weathering, fires and human activity can all change atmospheric composition.",
          "Atmospheric circulation also changes the distribution of heat, moisture, aerosols and chemical compounds around the planet.",
        ],
      },
      {
        heading: "Chemistry and life",
        paragraphs: [
          "Changes in atmospheric chemistry can alter conditions at Earth's surface. The history of oxygen, carbon dioxide, methane and other gases is closely connected with biological evolution and planetary climate.",
        ],
      },
    ],
  ),
  article(
    "ocean-change",
    "How Earth's Oceans Can Change",
    "The oceans can change in temperature, chemistry, circulation, sea level, ice cover and biological composition.",
    "ocean-change",
    8,
    [
      {
        heading: "An ocean in motion",
        paragraphs: [
          "Ocean water is continuously moved by winds, tides, density differences, currents and interactions with the atmosphere and seafloor. These processes redistribute heat and dissolved substances around the planet.",
          "Changes in temperature and freshwater input can alter circulation. Changes in atmospheric carbon dioxide can also affect ocean chemistry.",
        ],
        cards: [
          { title: "Sea level", text: "Sea level can change as ocean water expands or contracts and as land ice gains or loses mass." },
          { title: "Ocean chemistry", text: "The chemistry of seawater responds to exchanges with the atmosphere, rocks, sediments and living organisms." },
          { title: "Marine ecosystems", text: "Temperature, chemistry, nutrients and habitat structure can alter where marine organisms live and how communities are organised." },
        ],
      },
    ],
  ),
  article(
    "evolution-and-adaptation",
    "Evolution, Adaptation and Biological Change",
    "Populations change across generations through processes including natural selection, mutation, genetic drift, gene flow and reproduction.",
    "biological-change",
    9,
    [
      {
        heading: "Living systems change",
        paragraphs: [
          "Biological populations are not fixed. Genetic variation can arise through mutation and recombination, while selection, drift and gene flow change the frequencies of variants over generations.",
          "Natural selection can favour inherited traits that improve reproductive success under particular conditions. If conditions change, the traits favoured by selection can also change.",
        ],
        cards: [
          { title: "Adaptation", text: "A population can become better suited to an environment through evolutionary change across generations." },
          { title: "Migration", text: "Movement of organisms can introduce genes into populations and alter their composition." },
          { title: "Extinction", text: "Species can disappear when populations decline to zero, permanently removing a branch of biological diversity." },
        ],
      },
    ],
  ),
  article(
    "ecosystem-succession-and-recovery",
    "Ecosystem Change, Succession and Recovery",
    "Ecosystems can reorganise after disturbance as species arrive, disappear, compete and alter the conditions around them.",
    "ecosystem-change",
    7,
    [
      {
        heading: "Disturbance creates change",
        paragraphs: [
          "Fire, storms, floods, drought, volcanic activity, land clearing and other disturbances can remove organisms or alter habitat conditions. The resulting community may differ substantially from the previous one.",
          "Ecological succession describes predictable patterns of community development after particular disturbances, although real ecosystems do not always follow a single fixed sequence.",
        ],
      },
      {
        heading: "Resilience and thresholds",
        paragraphs: [
          "Some ecosystems recover toward previous conditions after disturbance, while others can shift into a different state when environmental conditions or pressures change sufficiently.",
        ],
      },
    ],
  ),
  article(
    "human-driven-earth-change",
    "How Humans Can Change Earth",
    "Human societies can alter land, water, atmospheric composition, ecosystems and the movement of materials at planetary scale.",
    "human-driven-change",
    10,
    [
      {
        heading: "Major pathways of change",
        paragraphs: [
          "Agriculture, urbanisation, mining, energy production, transport, industry, forestry and other activities transform landscapes and redistribute materials and energy.",
          "Human activities can also change habitats, introduce species, remove species, alter nutrient cycles and add pollutants to air, water and soil.",
        ],
        cards: [
          { title: "Land change", text: "Forests, grasslands, wetlands and other habitats can be converted, fragmented or restored." },
          { title: "Resource extraction", text: "Mining, drilling, fishing and other extraction can alter physical environments and resource availability." },
          { title: "Pollution", text: "Chemical and physical pollutants can change air, water, soil and biological communities." },
        ],
      },
      {
        heading: "Earth-system consequences",
        paragraphs: [
          "Because Earth's systems are connected, local changes can have regional or global consequences. Understanding those connections is essential when evaluating environmental change.",
        ],
      },
    ],
  ),
  article(
    "earthquakes-volcanoes-and-rapid-change",
    "Earthquakes, Volcanoes and Rapid Planetary Change",
    "Some of Earth's most dramatic changes happen quickly when stored energy is released or when magma reaches the surface.",
    "extreme-events",
    8,
    [
      {
        heading: "Sudden changes",
        paragraphs: [
          "Earthquakes occur when accumulated stress is released along faults. They can change the ground surface, trigger landslides and alter infrastructure and coastlines.",
          "Volcanic eruptions can rapidly deposit lava, ash and other materials while releasing gases and heat. Their effects range from local landscape transformation to wider atmospheric influences.",
        ],
      },
      {
        heading: "Rapid does not mean isolated",
        paragraphs: [
          "A sudden event can initiate longer-lasting changes. An earthquake may change drainage or trigger landslides, while an eruption can create new surfaces that are later colonised by organisms.",
        ],
      },
    ],
  ),
  article(
    "future-earths",
    "Future Earths: How Planetary Worlds Can Change",
    "Earth's future is not a single fixed outcome; different physical, climatic, biological and human conditions can produce different planetary states.",
    "future-earths",
    9,
    [
      {
        heading: "Many possible futures",
        paragraphs: [
          "Future Earth conditions depend on interacting processes. Climate, sea level, ecosystems, technology, land use, resource decisions and geological processes can all influence the trajectory of the planet.",
          "Earth-like planets elsewhere could also follow very different paths depending on their atmosphere, geology, oceans, stellar environment, chemistry and biological history.",
        ],
        cards: [
          { title: "Planetary climate", text: "Changes in atmospheric composition, solar input, oceans and surface properties can produce different climate states." },
          { title: "Biosphere", text: "Evolution, extinction, migration and ecological change can reorganise life across a planet." },
          { title: "Geology", text: "Tectonics, volcanism, erosion and interior heat can continue reshaping a planet long after its surface forms." },
        ],
      },
      {
        heading: "Thinking about change responsibly",
        paragraphs: [
          "Future projections are conditional rather than guarantees. Good scientific reasoning identifies assumptions, timescales, uncertainties and feedbacks instead of treating one scenario as inevitable.",
        ],
      },
    ],
  ),
];
