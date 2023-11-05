"use client";

import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher({ themeLabels }: { themeLabels: { darkMode: string; lightMode: string } }) {
  const { resolvedTheme, setTheme } = useTheme();

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
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        }}>
        {resolvedTheme === "dark" ? themeLabels.lightMode : themeLabels.darkMode}
      </span>
    </Fragment>
  );
}
