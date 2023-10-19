"use client";

import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher({ themeLabels }: { themeLabels: { darkMode: string; lightMode: string } }) {
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
        className={"underline hover:cursor-pointer"}
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}>
        {theme === "light" ? themeLabels.darkMode : themeLabels.lightMode}
      </span>
    </Fragment>
  );
}
