import { useEffect, useState } from "react";
import { fetchData } from "../../formats/csv";
import { Config, Theme } from "../../formats/model";

const getQuery = (key: string): string | null => {
  const rawUrl = new URL(window.location.href.toLowerCase());
  return rawUrl.searchParams.get(key);
};

const getQueryOrPrompt = (key: string, question: string): string => {
  const query = getQuery(key);
  if (query) {
    return query;
  }
  while (true) {
    const value = prompt(question);
    if (value) {
      return value;
    }
  }
};

export const useLotter = () => {
  const [config, setConfig] = useState<Config>({
    url: "",
    players: 0,
    themes: [],
  });
  const [history, setHistory] = useState<Theme[]>([]);

  // const theme = history[history.length - 1];

  const setup = async () => {
    const url = getQueryOrPrompt("url", "URL?");
    if (!url.endsWith(".csv") && !url.endsWith("txt")) {
      alert("invalid url. must be a csv file");
      return;
    }

    const data = await fetchData(url);
    const themes: Theme[] = data.map((value) => {
      const isImage = (row: string): boolean =>
        value.endsWith("png") || value.endsWith("jpg");
      if (isImage(value)) {
        return { type: "image", src: value };
      } else {
        return { type: "text", value };
      }
    });
    const players = parseInt(getQueryOrPrompt("players", "players?"));
    if (isNaN(players)) {
      alert("invalid player count");
      return;
    }
    setConfig({
      url,
      players,
      themes,
    });
  };

  useEffect(() => {
    setup();
  }, []);

  const next = () => {
    const nextTheme =
      config.themes[Math.floor(Math.random() * config.themes.length)];
    setHistory([...history, nextTheme]);
  };

  return {
    config,
    // theme,
    history,
    next,
  };
};
