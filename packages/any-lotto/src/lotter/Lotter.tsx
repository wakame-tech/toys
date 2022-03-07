import React from "react";
import { Theme } from "../formats/model";
import { useLotter } from "./hooks/useLotter";
import { ThemeComponent } from "./ThemeComponent";

const Lotter = () => {
  const { next, history, config } = useLotter();

  return (
    <div
      className="min-h-screen min-w-screen bg-white-200 dark:bg-gray-800
      text-black dark:text-white select-none
      "
      onClick={next}
    >
      <div>
        <small>
          {config.themes.length} themes {config.players} players
        </small>

        <div className="p-2 grid grid-cols-1 items-center">
          <div>
            {[...history]
              .map((h, i) => [h, i] as [Theme, number])
              .reverse()
              .map(([h, i]) => (
                <div
                  className={`bold p-2 ${
                    i === history.length - 1
                      ? "text-3rem text-center"
                      : "text-2rem"
                  }`}
                  key={i}
                >
                  <ThemeComponent
                    config={config}
                    history={history}
                    index={i}
                    theme={h}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lotter;
