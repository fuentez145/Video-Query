import HandlerPlay from "./HandlerPlay";


const page = () => {
  return (
    <div className=" flex mt-5 sm:mt-0 sm:items-center justify-center sm:h-full min-h-screen  w-full   p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-7">
       <HandlerPlay />
      </div>
    </div>
  );
};

export default page;
