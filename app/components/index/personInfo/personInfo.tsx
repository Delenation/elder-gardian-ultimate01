interface PersonInfoProps {
  name: string;
  age: number;
  id: string;
  avatarUrl?: string;
  onClick: () => void;
}

export default function PersonInfo({ name, age, id, avatarUrl, onClick }: PersonInfoProps) {
  return (
    <div
      className="w-[90%] bg-white rounded-xl shadow-md p-4 flex flex-col items-center transition-all duration-300 hover:shadow-lg mx-auto cursor-pointer"
      onClick={onClick}
    >
      <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-gray-200">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl">
            {name.charAt(0)}
          </div>
        )}
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-1 text-center">{name}</h2>

      <div className="text-sm text-gray-600 space-y-1 text-center">
        <p>年龄: {age} 岁</p>
        <p>ID: {id}</p>
      </div>
    </div>
  );
}