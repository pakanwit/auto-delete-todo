interface CardProps {
  name: string;
  onClick: () => void;
}
const Card = ({ name, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-full p-2 cursor-pointer hover:bg-gray-200 bg-white text-black flex items-center justify-center border border-gray-300 rounded"
    >
      {name}
    </div>
  );
};

export default Card;
