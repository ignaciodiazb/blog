"use client";

import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Fragment>
      <span
        className={"text-xs hover:cursor-pointer"}
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}>
        {theme === "light" ? "Dark" : "Light"} mode
      </span>
    </Fragment>
  );
}
