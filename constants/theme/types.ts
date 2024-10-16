export type ThemeString = "light" | "dark" | "system";
export type ThemeKeys =
  | "text"
  | "background"
  | "icon"
  | "shadowColor"
  | "linkBottom"
  | "error"
  | "success"
  | "button"
  | "link"
  | "placeholder"
  | "cursor"
  | "borderInput"
  | "headerBc"
  | "avatar"
  | "offline"
  | "online"
  | "chatBc"
  | "messageOutside";
export type ObjectColor = Record<ThemeKeys, string>;
export interface Colors {
  light: ObjectColor;
  dark: ObjectColor;
}
