import Marquee from "react-fast-marquee";

export default function MyResumeList() {
  return (
    <main className="h-auto pb-[6rem]">
      <section className="h-[360px] flex items-center justify-center">
        <h1 className="text-5xl text-slate-800 font-semibold max-w-md mx-auto text-center">
          {"Find design resume in seconds."}
        </h1>
      </section>
      <div>
        <Marquee className="gap-4 flex" autoFill gradient>
          {[1, 2].map((num) => (
            <div
              key={num}
              className="border-2 mx-3 rounded-lg bg-slate-100 w-[280px] h-[400px]"
            >
              mock template
            </div>
          ))}
        </Marquee>
      </div>
      <section className="h-[360px] flex justify-center items-center ">
        <h1 className="text-5xl font-semibold text-slate-800">
          {"From inspiration to creation."}
        </h1>
      </section>
      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between space-x-[20px]">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center gap-1">
              <div className="w-[320px] rounded-2xl h-[320px] bg-slate-100" />
              <h3 className="text-slate-700 mt-4 text-center font-medium text-xl">
                {"How to someing"}
              </h3>
              <p className="text-gray-400 max-w-[280px] font-normal text-center">
                {` Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Laborum, vero?`}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
