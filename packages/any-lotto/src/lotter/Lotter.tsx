import React from "react";
import { Theme } from "../formats/model";
import { useLotter } from "./hooks/useLotter";

const opacity = (i: number) => Math.max(10 - i, 1) * 10;

const Lotter = () => {
  const { next, theme, history, config } = useLotter();

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
          <div className="pt-2 pb-[10vh] bold text-3rem text-center">
            <p>{theme}</p>
          </div>

          <div>
            {[...history]
              .map((h, i) => [h, i] as [Theme, number])
              .reverse()
              .map(([h, i]) => (
                <div className="p-2" key={i}>
                  <p
                    className={`bold text-2rem opacity-${opacity(
                      history.length - i
                    )}
                ${i % config.players === config.players - 1 ? "pb-4" : ""}
                `}
                  >
                    {h}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lotter;
