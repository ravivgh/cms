const Card = ({ icon, title, value }) => {
  return (
    <>
      <div className="flex items-center gap-5 p-10  bg-[#27a1dd] rounded-lg shadow-sm">
        {/* #2C2C2C */}
        <div className="p-2 h-10 w-10 rounded-full bg-white text-primary">
          {icon}
        </div>
        <div>
          <h2 className="font-bold text-black">{title}</h2>
          <h2 className="text-black">{value}</h2>
        </div>
      </div>
    </>
  );
};

export default Card;
