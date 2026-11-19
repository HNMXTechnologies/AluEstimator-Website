// SAMPLE — replace before launch.
// Stats and testimonials are sample data (brief §11.3, §11.4).

export type Stat = {
  value: number;
  /** Decimal places shown while counting. */
  decimals?: number;
  suffix: string;
  label: string;
};

export const stats = {
  isSample: true,
  items: [
    { value: 500, suffix: "+", label: "fabricators" },
    { value: 120000, suffix: "+", label: "windows estimated" },
    { value: 35000, suffix: "+", label: "quotations sent" },
    { value: 4.8, decimals: 1, suffix: " / 5", label: "average rating from customers" },
  ] satisfies Stat[],
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  firm: string;
  city: string;
};

export const testimonials = {
  isSample: true,
  items: [
    {
      quote:
        "We used to spend a full evening calculating one bungalow's windows. Now I measure at the site and the quotation is on the customer's WhatsApp before I reach the workshop.",
      name: "Rakesh Prajapati",
      role: "Owner",
      firm: "Shree Ganesh Aluminium",
      city: "Ahmedabad",
    },
    {
      quote:
        "The cutting plan alone paid for the software. Our pipe waste came down and we stopped over-ordering stock.",
      name: "Imran Shaikh",
      role: "Partner",
      firm: "Royal Glass & Aluminium",
      city: "Pune",
    },
    {
      quote:
        "Coating used to be our biggest headache. Now we know exactly how many pipes are at the coater and what has come back.",
      name: "Suresh Nair",
      role: "Manager",
      firm: "Kerala Aluminium Works",
      city: "Kochi",
    },
  ] satisfies Testimonial[],
};
