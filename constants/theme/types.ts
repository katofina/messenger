export type ThemeString = "light" | "dark" | "system";
export type ThemeKeys =
  | "text"
  | "background"
  | "icon"
  | "shadowColor"
  | "linkBottom"
  | "error"
  | "success";
export type ObjectColor = Record<ThemeKeys, string>;
export interface Colors {
  light: ObjectColor;
  dark: ObjectColor;
}
