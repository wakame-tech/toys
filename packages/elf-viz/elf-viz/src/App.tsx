import { useState, useEffect, ChangeEvent } from "react";
import ElfComponent from "./components/ElfComponent";
import init, { parse_elf } from "./pkg/elf_viz";
import { Elf } from "./types";

function App() {
  const [elf, setElf] = useState<Elf | null>(null);

  const parseElf = async (e: ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement) || !e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const data = await new Response(file).arrayBuffer();
    const bin = new Uint8Array(data);
    const result = JSON.parse(parse_elf(bin));
    console.log(result);
    setElf(result);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="p-2">
      <button className="btn">hoge</button>
      <input type="file" id="input" onChange={parseElf} />

      {elf && <ElfComponent elf={elf} />}
    </div>
  );
}

export default App;
