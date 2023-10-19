"use client";

import { Fragment, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Fragment>{children}</Fragment>;
  }

  return <ThemeProvider attribute={"class"}>{children}</ThemeProvider>;
}
