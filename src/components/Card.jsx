const Card = ({ icon, title, value, description }) => {
  return (
    <div className="border border-[#cbcbcb] bg-[#ffffff] rounded-lg shadow-sm w-full sm:w-72 ">
      <div className="flex items-center gap-5 p-5">
        <div className="p-2 h-10 w-10 rounded-full bg-[#3f3f3f] text-white">
          {icon}
        </div>
        <div className="space-y-1">
          <h2 className="font-bold text-black">{title}</h2>
          <h2 className="text-black bg-[#fbefd8] w-fit px-5 rounded-full">
            {value}
          </h2>
        </div>
      </div>
      <p className="text-gray-200 bg-[#000000] px-3 py-2 w-fit rounded-tr-lg rounded-bl-lg">
        {description}
      </p>
    </div>
  );
};

export default Card;
