// Feature catalogue (brief §5) — shipped features only, written for workshop owners.

export type FeatureGroup = { title: string; items: string[] };

export type FeatureModule = {
  id: "estimator" | "quotations" | "partitions" | "inventory" | "billing" | "team";
  nav: string;
  eyebrow: string;
  title: string;
  intro: string;
  groups: FeatureGroup[];
};

export const featureModules: FeatureModule[] = [
  {
    id: "estimator",
    nav: "Estimator",
    eyebrow: "Estimator",
    title: "Your window designs, calculated to the cut.",
    intro:
      "Set up each window type once with your own profiles, formulas, glass and accessories. Then type site sizes and AluEstimator works out every cut, the cutting plan, weight, glass, coating, waste and price.",
    groups: [
      {
        title: "Window template library",
        items: [
          "Organise your designs as Series → Type → Option — e.g. 27mm · 3 Track + Net, Domal, Mini Domal",
          "Every design card shows a live drawing, how complete it is and how often it's used",
          "Copy an existing design in a few clicks and see exactly what changed from the original",
          "Import templates from Excel if you're moving over from spreadsheets",
        ],
      },
      {
        title: "Guided window builder",
        items: [
          "Step-by-step builder with the window drawing always on screen",
          "Simple formulas from width and height (e.g. w/2 − 0.5), with live values and plain-language errors",
          "Add pipes, glass and accessories — accessories by quantity or by running length",
          "Locks per side: handle, single-point, concealed and multipoint",
          "Per-shutter setup for 3+ shutter windows — side or middle, sliding or fixed",
          "Completeness checklist with one-click fixes, so no design is saved half-finished",
          "Variant Studio: make 2-track, 3-track and with/without net variants from one design and bulk-edit them",
          "A built-in guide that teaches new staff how templates work",
        ],
      },
      {
        title: "Estimation projects",
        items: [
          "One project per site or customer, linked to the customer record",
          "Window groups: choose profile, glass, coating and locks once, then enter many windows in a fast spreadsheet-like grid",
          "System-drawn preview of each window design",
          "Record floor and location for each window; import windows from Excel for large jobs",
        ],
      },
      {
        title: "Calculation & price",
        items: [
          "Exact pipe cut lengths for every window",
          "Optimised cutting plan on your stock lengths (12, 15 or 16 ft) to use the fewest full pipes",
          "Aluminium weight in kg, glass area, accessory quantities, coating cost and waste",
          "Warns you when a price is missing — nothing is quoted at zero by mistake",
          "Selling price line by line: labour and installation per sq ft, margin %, transport, discount (₹ or %) and GST",
          "Work in mm, inches, feet, metres or dora — switch any time, the maths stays exact",
        ],
      },
      {
        title: "One-click PDFs",
        items: [
          "Estimate (for the customer) and Cost Breakdown",
          "Cutting List and Fitting Sheet for the workshop and installation team",
          "Glass Order, Purchase List and Coater Order for your suppliers",
          "Waste Report, Window Design drawings and an internal Job Profit report",
          "Share an estimate by link, WhatsApp or email — or convert it to a GST quotation in one click",
        ],
      },
    ],
  },
  {
    id: "quotations",
    nav: "Quotations",
    eyebrow: "Quotations",
    title: "Quotations that make you look like a big company.",
    intro:
      "Six professional, branded designs with a drawing of every window. Pick the one that suits the customer, adjust what it shows, and send it on WhatsApp.",
    groups: [
      {
        title: "Six formats",
        items: [
          "Classic GST, Window Schedule, Per Sq. Ft., Room-wise Gallery, Elevation Sheet and Formal Letter + Annexures",
          "Show or hide logo, tagline, drawings, HSN, discount, tax breakup, amount in words, bank details, terms, acceptance block, signature and page numbers",
          "Edit the subject line and opening text",
        ],
      },
      {
        title: "GST & lifecycle",
        items: [
          "GST-correct totals with tax breakup, amount in words and financial-year numbering",
          "Draft → Sent → Approved / Rejected / Expired → Converted",
          "Extend validity, record why a quote was rejected, and see an activity timeline",
          "Add items from inventory or as custom lines",
          "Send by link, WhatsApp or email; convert an approved quotation to an invoice",
        ],
      },
    ],
  },
  {
    id: "partitions",
    nav: "Partitions",
    eyebrow: "Partition configurator",
    title: "Draw a partition. Get its cutting list.",
    intro:
      "Design aluminium-and-glass partitions visually and price them in the same project as your windows.",
    groups: [
      {
        title: "Visual canvas",
        items: [
          "Drag-and-drop canvas: split into bays and panes",
          "Set dimensions inline, in any unit",
          "Fit windows, fans and vents into partition panes",
        ],
      },
      {
        title: "Calculated with your windows",
        items: [
          "Partitions are calculated together with the project's windows",
          "Same cutting list, same cost sheet, same quotation",
        ],
      },
    ],
  },
  {
    id: "inventory",
    nav: "Inventory & coating",
    eyebrow: "Inventory & coating",
    title: "Know your stock — and what's at the coater.",
    intro:
      "Track pipes and accessories in and out, and manage powder coating and anodizing jobs right up to the last returned pipe.",
    groups: [
      {
        title: "Stock",
        items: [
          "Pipe stock by category and variant — section, length, colour / finish",
          "Accessories and accessory types, including kits made of several parts",
          "Stock ledger: every purchase, stock in/out, adjustment and transfer",
          "Draw stock from another workspace or branch",
          "Import opening stock from Excel",
        ],
      },
      {
        title: "Coating workflow",
        items: [
          "Coating vendors with their own price lists",
          "Send pipes for coating, record partial returns, close the job when everything is back",
        ],
      },
      {
        title: "Reports",
        items: [
          "Current stock, low stock and stock movement",
          "Coating pending, coating vendor and coating cost reports",
          "Inventory dashboard",
        ],
      },
    ],
  },
  {
    id: "billing",
    nav: "Billing & CRM",
    eyebrow: "Billing & CRM",
    title: "Invoices, payments and who owes how much.",
    intro:
      "Turn approved quotations into GST invoices, record every payment, and keep a clear running account for each customer.",
    groups: [
      {
        title: "Invoices & payments",
        items: [
          "GST invoices from a quotation or from scratch",
          "Status: Draft, Unpaid, Partially Paid, Paid, Cancelled",
          "Record payments by cash, bank, UPI, cheque or other — and split one payment across several invoices",
          "Share invoices by link, WhatsApp or email; download PDF",
        ],
      },
      {
        title: "Customers & follow-ups",
        items: [
          "Customer database with full details and history",
          "Follow-ups for calls, site visits, reminders and meetings, with pending / done tracking",
          "Customer ledger with automatic settlement and a downloadable account statement PDF",
        ],
      },
      {
        title: "Business dashboard",
        items: [
          "KPI cards and trend charts for sales, invoices, payments, quotations and customers",
          "Period selector and top-ranked lists such as best customers",
          "Setup progress card that guides a new firm through getting started",
        ],
      },
    ],
  },
  {
    id: "team",
    nav: "Multi-branch & team",
    eyebrow: "Multi-branch & team",
    title: "Every firm, branch and staff member — in one login.",
    intro:
      "Run several firms or branches with separate books, give each person exactly the access they need, and print your brand on every document.",
    groups: [
      {
        title: "Workspaces",
        items: [
          "Each firm or branch has its own GSTIN, staff, roles, settings and document numbering",
          "Combined view: select several workspaces to see merged lists and summed dashboards (read-only)",
          "Opening a new branch? Copy templates, materials and prices from an existing one",
        ],
      },
      {
        title: "Team, roles & permissions",
        items: [
          "Staff get their own logins",
          "Ready-made role templates, plus custom roles and per-person overrides on higher plans",
          "Staff see only the screens and actions their role allows — e.g. hide purchase rates and margins from site staff",
        ],
      },
      {
        title: "Company profile & branding",
        items: [
          "Logo, company details, bank information and GSTIN on every document",
          "Reusable terms & conditions for estimates, quotations and invoices",
          "Attach files to projects",
        ],
      },
    ],
  },
];

export const platformQualities = [
  { title: "Install like an app", body: "On Android, iPhone, tablet, Windows or Mac — straight from the browser, no app store." },
  { title: "Phone to desktop", body: "Fully responsive, so it works on site and in the office." },
  { title: "Light and dark themes", body: "Easy on the eyes in the workshop and late at night." },
  { title: "Global search", body: "Find any customer, project, quotation or invoice in your workspace." },
  { title: "Secure sign-in", body: "Two-factor sign-in (MFA), session control and an activity audit trail." },
  { title: "Data kept separate", body: "Each firm's data is strictly separated, and private data is never stored in the device's offline cache." },
  { title: "Cloud backed up", body: "Data is backed up centrally and available from anywhere with internet." },
];
