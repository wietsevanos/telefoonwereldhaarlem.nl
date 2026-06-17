export type RepairKey =
  | "scherm"
  | "batterij"
  | "laadpoort"
  | "camera"
  | "speaker"
  | "microfoon"
  | "achterkant"
  | "faceid"
  | "touchscreen"
  | "knoppen"
  | "moederbord"
  | "waterschade"
  | "software"
  | "dataherstel"
  | "scharnier"
  | "toetsenbord"
  | "ssd"
  | "koeling"
  | "controller"
  | "hdmi";

export const repairCatalog: Record<RepairKey, { label: string; from: number }> = {
  scherm: { label: "Scherm vervangen", from: 89 },
  batterij: { label: "Batterij vervangen", from: 49 },
  laadpoort: { label: "Oplaadpoort reparatie", from: 59 },
  camera: { label: "Camera reparatie", from: 69 },
  speaker: { label: "Speaker reparatie", from: 55 },
  microfoon: { label: "Microfoon reparatie", from: 55 },
  achterkant: { label: "Achterkant vervangen", from: 79 },
  faceid: { label: "Face ID reparatie", from: 99 },
  touchscreen: { label: "Touchscreen probleem", from: 89 },
  knoppen: { label: "Knoppen reparatie", from: 49 },
  moederbord: { label: "Moederbord reparatie", from: 149 },
  waterschade: { label: "Waterschade behandeling", from: 79 },
  software: { label: "Softwareprobleem oplossen", from: 39 },
  dataherstel: { label: "Dataherstel", from: 99 },
  scharnier: { label: "Scharnier of vouwmechanisme", from: 129 },
  toetsenbord: { label: "Toetsenbord vervangen", from: 119 },
  ssd: { label: "SSD of opslag upgrade", from: 99 },
  koeling: { label: "Koeling en ventilator", from: 89 },
  controller: { label: "Controller of joystick reparatie", from: 49 },
  hdmi: { label: "HDMI poort reparatie", from: 79 },
};

export type Brand = {
  name: string;
  models: string[];
  repairs: RepairKey[];
};

export type Category = {
  id: string;
  label: string;
  device: string;
  brands: Brand[];
};

const phoneRepairs: RepairKey[] = [
  "scherm",
  "batterij",
  "laadpoort",
  "camera",
  "speaker",
  "microfoon",
  "achterkant",
  "faceid",
  "touchscreen",
  "knoppen",
  "moederbord",
  "waterschade",
  "software",
  "dataherstel",
];

const phoneRepairsNoFaceId: RepairKey[] = phoneRepairs.filter((r) => r !== "faceid");

const tabletRepairs: RepairKey[] = [
  "scherm",
  "batterij",
  "laadpoort",
  "camera",
  "speaker",
  "knoppen",
  "software",
  "waterschade",
  "moederbord",
  "dataherstel",
];

const laptopRepairs: RepairKey[] = [
  "scherm",
  "batterij",
  "toetsenbord",
  "ssd",
  "koeling",
  "laadpoort",
  "software",
  "waterschade",
  "moederbord",
  "dataherstel",
];

const watchRepairs: RepairKey[] = [
  "scherm",
  "batterij",
  "achterkant",
  "knoppen",
  "software",
];

const consoleRepairs: RepairKey[] = [
  "hdmi",
  "controller",
  "laadpoort",
  "koeling",
  "software",
  "ssd",
];

const navRepairs: RepairKey[] = [
  "scherm",
  "batterij",
  "touchscreen",
  "software",
];

export const categories: Category[] = [
  {
    id: "smartphones",
    label: "Smartphones",
    device: "Smartphone",
    brands: [
      {
        name: "Apple",
        repairs: phoneRepairs,
        models: [
          "iPhone 16 Pro Max",
          "iPhone 16 Pro",
          "iPhone 16 Plus",
          "iPhone 16",
          "iPhone 15 Pro Max",
          "iPhone 15 Pro",
          "iPhone 15 Plus",
          "iPhone 15",
          "iPhone 14 Pro Max",
          "iPhone 14 Pro",
          "iPhone 14 Plus",
          "iPhone 14",
          "iPhone 13 Pro Max",
          "iPhone 13 Pro",
          "iPhone 13",
          "iPhone 13 mini",
          "iPhone 12 Pro Max",
          "iPhone 12 Pro",
          "iPhone 12",
          "iPhone 12 mini",
          "iPhone 11 Pro Max",
          "iPhone 11 Pro",
          "iPhone 11",
          "iPhone SE (2022)",
          "iPhone SE (2020)",
          "iPhone XS Max",
          "iPhone XS",
          "iPhone XR",
          "iPhone X",
        ],
      },
      {
        name: "Samsung",
        repairs: phoneRepairsNoFaceId,
        models: [
          "Galaxy S24 Ultra",
          "Galaxy S24+",
          "Galaxy S24",
          "Galaxy S23 Ultra",
          "Galaxy S23+",
          "Galaxy S23",
          "Galaxy S22 Ultra",
          "Galaxy S22",
          "Galaxy S21",
          "Galaxy S20",
          "Galaxy A55",
          "Galaxy A54",
          "Galaxy A35",
          "Galaxy A34",
          "Galaxy A25",
          "Galaxy A15",
          "Galaxy Note 20 Ultra",
          "Galaxy Note 20",
          "Galaxy Note 10+",
          "Galaxy Z Fold 5",
          "Galaxy Z Fold 4",
          "Galaxy Z Fold 3",
          "Galaxy Z Flip 5",
          "Galaxy Z Flip 4",
          "Galaxy Z Flip 3",
        ],
      },
      {
        name: "Google",
        repairs: phoneRepairsNoFaceId,
        models: [
          "Pixel 8 Pro",
          "Pixel 8",
          "Pixel 8a",
          "Pixel 7 Pro",
          "Pixel 7",
          "Pixel 7a",
          "Pixel 6 Pro",
          "Pixel 6",
          "Pixel 6a",
          "Pixel 5",
        ],
      },
      {
        name: "OnePlus",
        repairs: phoneRepairsNoFaceId,
        models: [
          "OnePlus 12",
          "OnePlus 11",
          "OnePlus 10 Pro",
          "OnePlus 9 Pro",
          "OnePlus Nord 3",
          "OnePlus Nord 2T",
          "OnePlus Nord CE 3",
        ],
      },
      {
        name: "Xiaomi",
        repairs: phoneRepairsNoFaceId,
        models: [
          "Xiaomi 14 Ultra",
          "Xiaomi 14",
          "Xiaomi 13 Pro",
          "Xiaomi 13",
          "Redmi Note 13 Pro",
          "Redmi Note 13",
          "Redmi Note 12",
          "Poco F5 Pro",
          "Poco F5",
          "Poco X6",
        ],
      },
      {
        name: "Oppo",
        repairs: phoneRepairsNoFaceId,
        models: [
          "Find X7 Ultra",
          "Find X6 Pro",
          "Reno 11 Pro",
          "Reno 10",
          "A98",
          "A78",
          "A58",
        ],
      },
      {
        name: "Huawei",
        repairs: phoneRepairsNoFaceId,
        models: [
          "P60 Pro",
          "P50 Pro",
          "Mate 50 Pro",
          "Nova 11",
        ],
      },
      {
        name: "Sony",
        repairs: phoneRepairsNoFaceId,
        models: [
          "Xperia 1 V",
          "Xperia 5 V",
          "Xperia 10 V",
        ],
      },
      {
        name: "Nokia",
        repairs: phoneRepairsNoFaceId,
        models: [
          "G50",
          "X30",
          "XR21",
        ],
      },
    ],
  },
  {
    id: "tablets",
    label: "Tablets",
    device: "Tablet",
    brands: [
      {
        name: "Apple iPad",
        repairs: tabletRepairs,
        models: [
          "iPad Pro 12.9 (M4)",
          "iPad Pro 11 (M4)",
          "iPad Air (M2)",
          "iPad Air 5",
          "iPad 10",
          "iPad 9",
          "iPad mini 6",
        ],
      },
      {
        name: "Samsung Galaxy Tab",
        repairs: tabletRepairs,
        models: [
          "Tab S9 Ultra",
          "Tab S9+",
          "Tab S9",
          "Tab S8",
          "Tab A9+",
          "Tab A9",
        ],
      },
      {
        name: "Lenovo",
        repairs: tabletRepairs,
        models: ["Tab P12", "Tab M10", "Yoga Tab 13"],
      },
      {
        name: "Microsoft Surface",
        repairs: tabletRepairs,
        models: ["Surface Pro 9", "Surface Pro 8", "Surface Go 4"],
      },
    ],
  },
  {
    id: "laptops",
    label: "Laptops",
    device: "Laptop",
    brands: [
      {
        name: "Dell",
        repairs: laptopRepairs,
        models: ["XPS 15", "XPS 13", "Inspiron 16", "Latitude 7440"],
      },
      {
        name: "Lenovo",
        repairs: laptopRepairs,
        models: ["ThinkPad X1 Carbon", "ThinkPad T14", "Yoga Slim 7", "IdeaPad 5"],
      },
      {
        name: "HP",
        repairs: laptopRepairs,
        models: ["Spectre x360", "EliteBook 840", "Pavilion 15", "Omen 16"],
      },
      {
        name: "Asus",
        repairs: laptopRepairs,
        models: ["ZenBook 14", "ROG Zephyrus G14", "VivoBook 15"],
      },
      {
        name: "Acer",
        repairs: laptopRepairs,
        models: ["Swift 5", "Aspire 5", "Predator Helios"],
      },
      {
        name: "Microsoft Surface",
        repairs: laptopRepairs,
        models: ["Surface Laptop 5", "Surface Laptop Studio"],
      },
    ],
  },
  {
    id: "macbooks",
    label: "MacBooks",
    device: "MacBook",
    brands: [
      {
        name: "MacBook Pro",
        repairs: laptopRepairs,
        models: [
          "MacBook Pro 16 (M3 Max)",
          "MacBook Pro 14 (M3 Pro)",
          "MacBook Pro 14 (M3)",
          "MacBook Pro 13 (M2)",
          "MacBook Pro 16 (2019)",
          "MacBook Pro 15 (2018)",
        ],
      },
      {
        name: "MacBook Air",
        repairs: laptopRepairs,
        models: [
          "MacBook Air 15 (M3)",
          "MacBook Air 13 (M3)",
          "MacBook Air 13 (M2)",
          "MacBook Air 13 (M1)",
          "MacBook Air (2019)",
          "MacBook Air (2017)",
        ],
      },
    ],
  },
  {
    id: "smartwatches",
    label: "Smartwatches",
    device: "Smartwatch",
    brands: [
      {
        name: "Apple Watch",
        repairs: watchRepairs,
        models: [
          "Watch Ultra 2",
          "Watch Series 9",
          "Watch Series 8",
          "Watch Series 7",
          "Watch SE (2022)",
          "Watch Series 6",
        ],
      },
      {
        name: "Samsung Galaxy Watch",
        repairs: watchRepairs,
        models: ["Galaxy Watch 6 Classic", "Galaxy Watch 6", "Galaxy Watch 5", "Galaxy Watch 4"],
      },
      {
        name: "Garmin",
        repairs: watchRepairs,
        models: ["Fenix 7", "Forerunner 965", "Venu 3"],
      },
    ],
  },
  {
    id: "consoles",
    label: "Gameconsoles",
    device: "Gameconsole",
    brands: [
      {
        name: "Sony PlayStation",
        repairs: consoleRepairs,
        models: ["PlayStation 5 Slim", "PlayStation 5", "PlayStation 4 Pro", "PlayStation 4"],
      },
      {
        name: "Microsoft Xbox",
        repairs: consoleRepairs,
        models: ["Xbox Series X", "Xbox Series S", "Xbox One X", "Xbox One"],
      },
      {
        name: "Nintendo",
        repairs: consoleRepairs,
        models: ["Switch OLED", "Switch", "Switch Lite"],
      },
    ],
  },
  {
    id: "navigatie",
    label: "Navigatiesystemen",
    device: "Navigatiesysteem",
    brands: [
      {
        name: "TomTom",
        repairs: navRepairs,
        models: ["GO Expert", "GO Discover", "Start 62"],
      },
      {
        name: "Garmin",
        repairs: navRepairs,
        models: ["DriveSmart 76", "DriveSmart 66", "Drive 52"],
      },
    ],
  },
];

export const specialServices = [
  {
    label: "Waterschade behandeling",
    desc: "Ultrasone reiniging en componentcontrole. Wij beoordelen de schade en bespreken de slagingskans voordat wij beginnen.",
    price: "vanaf €79",
  },
  {
    label: "Dataherstel",
    desc: "Foto's, contacten en documenten terughalen van een toestel dat niet meer opstart of beschadigd is geraakt.",
    price: "vanaf €99",
  },
  {
    label: "Softwareproblemen",
    desc: "Vastlopers, opstartproblemen of een toestel dat niet meer reageert. Wij stellen de oorzaak vast en lossen het op.",
    price: "vanaf €39",
  },
  {
    label: "Moederbord reparatie",
    desc: "Microsoldeerwerk voor laadcircuits, beeldchips en stroomvoorziening. Wanneer een standaardreparatie geen optie is.",
    price: "vanaf €149",
  },
  {
    label: "Face ID reparatie",
    desc: "Defecte Face ID op iPhone hersteld door onze specialist, inclusief uitlijning van de TrueDepth-modules.",
    price: "vanaf €99",
  },
  {
    label: "Overige elektronica",
    desc: "Speakers, koptelefoons, e-readers, drones en andere apparaten. Loop binnen voor een vrijblijvende beoordeling.",
    price: "op aanvraag",
  },
];