"use client";

import Link from "next/link";
import { AppBar } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import DarkThemeIcon from "@mui/icons-material/DarkMode";
import LightThemeIcon from "@mui/icons-material/LightMode";

import { useCustomizingStore } from "@/stores/useCustomizingStore";
import style from "./Header.module.scss";

const Header = () => {
  const { theme, setTheme } = useCustomizingStore();

  const handleChangeTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <AppBar position="sticky" className={style.header}>
      <div>
        <Link href="/">
          <h1 className={style.title}>
            <CodeIcon sx={{ display: "block" }} />
            Three.js Shader Editor
          </h1>
        </Link>

        <div>
          <button className={style.button} onClick={handleChangeTheme}>
            {theme === "dark" ? (
              <LightThemeIcon sx={{ display: "block" }} />
            ) : (
              <DarkThemeIcon sx={{ display: "block", color: "white" }} />
            )}
          </button>
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
