// FAQ seed (brief §8.4). Answers are grounded in shipped features only.

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do I need to install anything?",
    a: "No. AluEstimator runs in your browser. You can also install it on your phone, tablet or computer like an app — straight from the browser, no app store needed.",
  },
  {
    q: "Can I use my own window designs?",
    a: "Yes. You build your own window templates with your own profiles, formulas, glass and accessories — sliding, domal, openable, with or without mosquito net — and reuse them on every job.",
  },
  {
    q: "Which units are supported?",
    a: "Millimetres, inches, feet, metres and dora. Switch at any time; the maths stays exact.",
  },
  {
    q: "Does it handle GST?",
    a: "Yes. Quotations and invoices are GST-ready, with tax breakup, amount in words and financial-year document numbering.",
  },
  {
    q: "Can I send quotations on WhatsApp?",
    a: "Yes — as a link or a PDF. Estimates and invoices can be shared the same way, or by email.",
  },
  {
    q: "Can my staff use it?",
    a: "Yes. Each person gets their own login and sees only the screens and actions their role allows — for example, you can hide purchase rates and margins from site staff.",
  },
  {
    q: "I have two firms or branches.",
    a: "Run both from one login, each with its own GSTIN, staff and document numbering. Multiple workspaces are available on Pro (2) and Enterprise (10).",
  },
  {
    q: "Can I move my data from Excel?",
    a: "Yes. Window templates, project windows and opening stock can be imported from Excel — and our team will help you do it for free.",
  },
  {
    q: "Are all features included in every plan?",
    a: "Yes. Every plan includes every module. Plans differ only by volume — people, branches, catalogue size and documents per month.",
  },
  {
    q: "Is my data safe?",
    a: "Each firm's data is kept strictly separate, sign-in supports two-factor authentication, there is an activity audit trail, and private business data is never stored in the device's offline cache.",
  },
];
