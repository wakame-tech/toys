import { Config, ImageTheme, TextTheme, Theme } from "../formats/model";

const opacity = (i: number) => Math.max(10 - i, 1) * 10;

interface ThemeComponentProps<T extends Theme> {
  config: Config;
  history: T[];
  index?: number;
  theme: T;
}

export const TextComponent = (props: ThemeComponentProps<TextTheme>) => {
  const opacityClass =
    props.index !== undefined
      ? `opacity-${opacity(props.history.length - props.index)}`
      : "";
  const pbClass =
    props.index &&
    props.index % props.config.players === props.config.players - 1
      ? "pb-4"
      : "";
  return <p className={`${opacityClass} ${pbClass}`}>{props.theme.value}</p>;
};

export const ImageComponent = (props: ThemeComponentProps<ImageTheme>) => {
  const opacityClass =
    props.index !== undefined
      ? `opacity-${opacity(props.history.length - props.index)}`
      : "";
  return <img className={`${opacityClass}`} src={props.theme.src} />;
};

export const ThemeComponent = (props: ThemeComponentProps<Theme>) => {
  return (
    <>
      {props.theme.type === "text" && (
        <TextComponent {...(props as ThemeComponentProps<TextTheme>)} />
      )}
      {props.theme.type === "image" && (
        <ImageComponent {...(props as ThemeComponentProps<ImageTheme>)} />
      )}
    </>
  );
};
