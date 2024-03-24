export default function Banner() {
  return (
    <section
      role="banner"
      className="flex flex-col justify-center items-center min-h-[450px] max-md:min-h-[350px] max-md:px-1 max-sm:min-h-[300px]"
    >
      <div className="flex flex-col w-fit items-center">
        <h1 className="text-[6rem] max-2xl:text-[5rem] max-lg:text-[4rem] max-md:text-[3.5rem] max-md:text-center max-sm:text-[2.5rem] text-slate-800 capitalize">
          {"find your"}
          <span className="text-sky-500 ml-4">{"job"}</span>
        </h1>
        <h1 className="text-[6rem] max-2xl:text-[5rem] max-md:text-[3.5rem] max-sm:text-[2.25rem] max-md:text-center text-slate-800">
          {"Easy and Fast."}
        </h1>
        <p
          aria-label="banner-description"
          className="text-xl max-lg:text-[18px] max-md:text-[15px] max-md:text-center"
        >
          {"A platform where you can get your desired job without any hassle."}
        </p>
      </div>
    </section>
  );
}
