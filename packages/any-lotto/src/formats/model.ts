export type TextTheme = {
  type: "text";
  value: string;
};

export type ImageTheme = {
  type: "image";
  src: string;
};

export type Theme = TextTheme | ImageTheme;
export interface Config {
  url: string;
  players: number;
  themes: Theme[];
}
