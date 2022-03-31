import { schemeCategory10 } from "d3-scale-chromatic";
import Papaparse from "papaparse";
import type { Data } from "plotly.js";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Plot from "react-plotly.js";
import { UMAP } from "umap-js";

const parseData = (file: File): Promise<OriginalData> => {
  const conv = (rows: number[][], limit: number = 1000): OriginalData => {
    const selectedRows = [...Array(limit)].map(
      () => rows[Math.floor(Math.random() * rows.length)]
    );
    const data = selectedRows.map((row) => row.slice(0, -1));
    const labels = selectedRows.map((row) => row[row.length - 1].toString());
    return {
      data,
      labels,
      labelSet: new Set(labels),
    };
  };

  return new Promise((resolve, reject) => {
    Papaparse.parse<number[]>(file, {
      complete: (res) => resolve(conv(res.data)),
      error: (err) => reject(err),
    });
  });
};

const exts = ["csv", "tsv"];

interface OriginalData {
  // vectors
  data: number[][];
  labels: string[];
  labelSet: Set<string>;
}

interface EmbeddingResult {
  x: number[];
  y: number[];
  labels: string[];
}

const mapColor = (set: string[], label: string): string => {
  const index = set.indexOf(label);
  return schemeCategory10[index % 10];
};

const App = () => {
  const [originalData, setOriginalData] = useState<OriginalData>({
    data: [],
    labels: [],
    labelSet: new Set(),
  });
  const [plots, setPlots] = useState<Data>({});

  useEffect(() => {
    (async () => {
      if (originalData.data.length === 0) {
        return;
      }
      const umap = new UMAP();
      const embedding = await umap.fitAsync(originalData.data);
      const color = originalData.labels.map((label) =>
        mapColor(Array.from(originalData.labelSet), label)
      );
      setPlots({
        x: embedding.map((e) => e[0]),
        y: embedding.map((e) => e[1]),
        text: originalData.labels,
        type: "scatter",
        mode: "text+markers",
        marker: {
          color,
          size: 12,
        },
      } as Data);
    })();
  }, [originalData]);

  const onChange = async (file: File) => {
    const data = await parseData(file);
    setOriginalData(data);
  };

  return (
    <div>
      <FileUploader handleChange={onChange} types={exts} />

      <Plot
        config={{
          scrollZoom: true,
          editable: false,
          displayModeBar: false,
          showAxisDragHandles: false,
        }}
        data={[plots]}
        layout={{
          width: window.innerWidth,
          height: window.innerHeight,
          xaxis: { visible: false },
          yaxis: { visible: false },
          font: {
            size: 16,
          },
        }}
      />
    </div>
  );
};

export default App;
