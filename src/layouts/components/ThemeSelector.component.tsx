"use client";
import { useMounted } from "@/hooks/useMounted";
import { LightBulbIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeSectorProps {}

const ThemeSector = (props: ThemeSectorProps) => {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  return (
    <>
      {mounted && theme == "dark" && (
        <button className="btn btn-ghost" onClick={() => setTheme("light")}>
          <LightBulbIcon className="h-6 w-6" />
        </button>
      )}

      {mounted && theme == "light" && (
        <button className="btn btn-ghost" onClick={() => setTheme("dark")}>
          <MoonIcon className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default ThemeSector;
