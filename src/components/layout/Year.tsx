"use client";

import { useEffect, useState } from "react";

const BUILD_YEAR = 2026;

/** Static year in the prerendered shell, corrected on the client if the calendar has moved on. */
export function Year() {
  const [year, setYear] = useState(BUILD_YEAR);
  useEffect(() => {
    const id = requestAnimationFrame(() => setYear(new Date().getFullYear()));
    return () => cancelAnimationFrame(id);
  }, []);
  return <span>{year}</span>;
}
