// Home page copy. Claims must stay within the shipped feature catalogue (brief §5).

export const hero = {
  eyebrow: "Estimation software for aluminium fabricators",
  headline: "From site measurement to GST quotation — in minutes.",
  sub: "Enter width × height. AluEstimator works out every pipe cut, the cutting plan, glass, accessories, coating and price — then sends a branded quotation on WhatsApp.",
  bullets: ["Your own window designs", "mm · inch · ft · dora", "GST-ready quotations"],
};

export const beforeAfter = {
  title: "The same bungalow. Two very different evenings.",
  sub: "Drag the slider. On the left, the way most workshops still quote. On the right, the same job in AluEstimator.",
  before: {
    label: "Notebook & calculator",
    caption: "An evening of sums · re-done for every revision",
  },
  after: {
    label: "AluEstimator",
    caption: "Minutes · revise and resend in one tap",
  },
};

export const steps = [
  {
    title: "Build your window designs",
    body: "Set up each window type once — sliding, domal, openable, with or without mosquito net — with your own profiles, formulas, glass and accessories.",
  },
  {
    title: "Enter site measurements",
    body: "Pick a window type, choose materials once, then type sizes into a fast, spreadsheet-like grid. In mm, inches, feet, metres or dora.",
  },
  {
    title: "Get cutting plan, cost & price",
    body: "Every pipe cut, the optimised cutting plan, glass, accessories, coating, waste — plus labour, installation, margin, transport and GST.",
  },
  {
    title: "Send a branded quotation on WhatsApp",
    body: "Pick one of six professional formats with drawings of every window. Share as a link or PDF and convert to an invoice when approved.",
  },
];

export const featureRows = {
  engine: {
    eyebrow: "Calculation engine",
    title: "Accurate to the cut.",
    body: "AluEstimator turns every window's width × height into exact pipe cut lengths, then packs them onto your standard stock lengths — 12, 15 or 16 ft — to use the fewest full pipes.",
    points: [
      "Weight in kg, glass area, accessory counts, coating cost and waste",
      "Per-window cost, pipe allocation and estimate lines in clear tables",
      "Warns you when a price is missing — nothing is quoted at zero by mistake",
      "Cutting list, glass order, purchase list, coater order and fitting sheet as PDFs",
    ],
  },
  formats: {
    eyebrow: "Quotations",
    title: "Look like a big company.",
    body: "Six professional, branded quotation designs — with a drawing of every window. Show or hide logo, HSN, tax breakup, bank details, terms and signature to suit each customer.",
    points: [
      "GST-correct totals, amount in words, financial-year numbering",
      "Draft → Sent → Approved → Converted, with an activity timeline",
      "Send by link, WhatsApp or email; convert to an invoice in one click",
    ],
  },
  partitions: {
    eyebrow: "Partition configurator",
    title: "Draw a partition. Get its cutting list.",
    body: "Design aluminium partitions on a drag-and-drop canvas: split into bays and panes, set sizes inline in any unit, and fit windows, fans and vents into panes.",
    points: [
      "Calculated together with the project's windows",
      "Same cutting list, same cost sheet, same quotation",
    ],
  },
  coating: {
    eyebrow: "Coating & stock",
    title: "Know exactly what is at the coater.",
    body: "Send pipes for powder coating or anodizing, record partial returns, and close the job when everything is back. Stock in, stock out and transfers are all in the ledger.",
    points: [
      "Coating vendors with their own price lists",
      "Low-stock, coating-pending and coating-cost reports",
      "Pipe stock by section, length and colour / finish",
    ],
  },
};

export const pipeline = {
  title: "One app for the whole job.",
  sub: "No re-typing between notebooks, Excel and a billing app. Each step picks up exactly where the last one ended.",
  stages: [
    { key: "measure", label: "Measure", note: "Site sizes in any unit" },
    { key: "estimate", label: "Estimate", note: "Cuts, glass, cost" },
    { key: "quotation", label: "Quotation", note: "Branded GST quote" },
    { key: "invoice", label: "Invoice", note: "One-click from approved quote" },
    { key: "payment", label: "Payment", note: "Cash, bank, UPI, cheque" },
    { key: "ledger", label: "Ledger", note: "Who owes how much" },
  ],
} as const;

export const devices = {
  title: "On site with your phone. In the office on your computer.",
  sub: "Install AluEstimator on Android, iPhone, tablet, Windows or Mac straight from the browser — no app store. Light and dark themes included.",
};

export const builtForIndia = {
  title: "Built for how Indian workshops actually work.",
  items: [
    { key: "gst", title: "GST-ready", body: "Tax breakup, HSN, amount in words and FY numbering." },
    { key: "rupee", title: "₹ and Indian numbers", body: "Amounts like ₹1,99,990 — the way your customers read them." },
    { key: "dora", title: "Dora measurements", body: "Inches with fractions, like 48 3/8, right alongside mm and feet." },
    { key: "whatsapp", title: "WhatsApp sharing", body: "Send quotations, estimates and invoices as a link or PDF." },
    { key: "payments", title: "UPI, cheque, cash", body: "Record any payment and split it across invoices." },
    { key: "gstin", title: "Multiple GSTINs", body: "Run two firms or branches from one login, books kept separate." },
  ],
} as const;

export const finalCta = {
  title: "See your own window, quoted in minutes.",
  sub: "Book a free 30-minute demo — online or at your workshop. We set up your 14-day free trial and help import your designs and stock from Excel.",
};
