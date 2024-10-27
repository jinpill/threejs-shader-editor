import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface MyTheme {}

  interface Theme extends MyTheme {}
  interface ThemeOptions extends MyTheme {}
}
