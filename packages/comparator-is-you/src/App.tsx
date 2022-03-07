import { ChoiceCard } from "./ChoiceCard";
import { useAsyncSorter } from "./useAsyncSorter";

function App() {
  const {
    index,
    total,
    setInput,
    start,
    select,
    left,
    right,
    onClickCopy,
    result,
  } = useAsyncSorter();

  return (
    <div className="min-h-screen bg-light-200">
      <div className="p-4">
        <p className="text-center text-4xl font-bold">
          sort by <span className="text-red-500">me</span>
        </p>

        <p className="p-1 text-xl font-bold">items (1 item per line)</p>
        <textarea
          className="w-full bg-white"
          rows={5}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex justify-center mt-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={start}
          >
            Sort by me
          </button>
        </div>
      </div>

      <p className="p-2 font-bold text-1.5rem">
        {index}/{total}
      </p>

      <div className="select-none p-2 grid gap-4 grid-cols-1 md:grid-cols-2 place-items-center">
        <ChoiceCard onClick={() => select(-1)} text={left} />
        <ChoiceCard onClick={() => select(1)} text={right} />
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={(e) => select(0)}>
          <p className="p-2 text-center text-xl bg-gray-500 rounded-md text-white font-bold">
            same
          </p>
        </button>
      </div>

      <div>
        <span className="p-2 text-xl font-bold">result</span>
        <button
          className="p-2 bg-green-500 text-white rounded-md"
          onClick={onClickCopy}
        >
          Copy
        </button>
      </div>
      <div className="p-2">
        {result.map((item, i) => (
          <div key={i} className="p-1">
            <span className="pr-2 text-gray-500">{i + 1}</span>
            <span className="text-xl font-bold">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
