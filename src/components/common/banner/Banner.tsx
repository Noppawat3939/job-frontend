export default function Banner() {
  return (
    <section
      role="banner"
      className="flex flex-col justify-center items-center min-h-[450px] max-md:min-h-[350px] max-md:px-1 max-sm:min-h-[300px]"
    >
      <div className="flex font-semibold flex-col w-fit items-center">
        <h1 className="text-[110px] font-normal max-md:text-center max-sm:text-[2.5rem] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-500 inline-block text-transparent bg-clip-text capitalize">
          {"find your"}
          <span className="bg-gradient-to-b from-sky-600 via-sky-400 to-sky-300 inline-block text-transparent bg-clip-text ml-4">
            {"job"}
          </span>
        </h1>
        <h1 className="text-[110px] mt-[-30px] font-normal max-md:text-center bg-gradient-to-t from-slate-900 via-slate-800 to-slate-500 inline-block text-transparent bg-clip-text">
          {"Easy and Fast."}
        </h1>
        <p
          aria-label="banner-description"
          className="text-lg text-slate-700 font-medium max-lg:text-[18px] max-md:text-[15px] max-md:text-center"
        >
          {"A platform where you can get your desired job without any hassle."}
        </p>
      </div>
    </section>
  );
}
