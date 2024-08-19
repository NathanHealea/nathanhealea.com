
'use client';
import { LightBulbIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeSectorProps {}

const ThemeSector = (props: ThemeSectorProps) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {theme == "dark" && (
        <button className="btn btn-ghost" onClick={() => setTheme("light")}>
          <LightBulbIcon className="h-6 w-6" />
        </button>
      )}

      {theme == "light" && (
        <button className="btn btn-ghost" onClick={() => setTheme("dark")}>
          <MoonIcon className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default ThemeSector;
