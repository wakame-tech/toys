type ChoiceCardProps = {
  text: string;
  onClick: () => void;
};

export const ChoiceCard = (props: ChoiceCardProps) => {
  return (
    <div
      onClick={(e) => props.onClick()}
      className="w-full h-40 md:h-60 w-full h-full rounded-md shadow-md"
    >
      <div className="w-full h-full grid place-items-center">
        <p className="text-xl font-bold">{props.text}</p>
      </div>
    </div>
  );
};
