import { Avatar, Card } from "@/components";
import { ResumeTemplate, Testimonial } from "@/types";
import Marquee from "react-fast-marquee";
import DefaultProfile from "@/assets/profile-user.svg";
import Image from "next/image";
import Link from "next/link";

type MyResumeListProps = {
  testimonials: Testimonial[];
  templates: ResumeTemplate[];
};

export default function MyResumeList({
  testimonials,
  templates,
}: MyResumeListProps) {
  return (
    <main className="h-auto flex flex-col gap-4 pb-[6rem]">
      <section className="h-[360px] flex items-center justify-center">
        <h1 className="text-5xl text-slate-800 font-semibold max-w-md mx-auto text-center">
          {"Find design resume in seconds."}
        </h1>
      </section>
      <div>
        <Marquee
          pauseOnHover
          className="gap-6 flex"
          autoFill
          gradient
          speed={50}
        >
          {templates.map((item) => (
            <Link key={item.id} href={`/my-resume/${item.id}`}>
              <picture className="transition-all duration-150 hover:opacity-60">
                <img
                  src={item.image}
                  alt="ex_templarte"
                  loading="lazy"
                  className="rounded-2xl mx-6 border"
                />
              </picture>
            </Link>
          ))}
        </Marquee>
      </div>
      <section className="h-[360px] flex justify-center items-center">
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

      <section className="flex max-w-5xl mx-auto flex-col justify-center items-center">
        <div className="h-[360px] flex items-center">
          <h1 className="text-5xl font-semibold text-slate-800">
            {"What our users are saying."}
          </h1>
        </div>
        <br />
        <div className="grid grid-cols-3 gap-6 ">
          {testimonials.map((item) => (
            <Card.Card
              key={`testimonial_${item.id}`}
              className="rounded-2xl bg-transparent"
            >
              <Card.CardHeader>
                <div className="flex gap-4 items-center">
                  <Avatar.Avatar>
                    <Avatar.AvatarImage
                      loading="lazy"
                      className="object-cover"
                      src={item.profile}
                    />
                    <Avatar.AvatarFallback>
                      <Image
                        src={DefaultProfile}
                        alt="def-profile"
                        className="w-[40px] h-[40px] rounded-full object-cover"
                      />
                    </Avatar.AvatarFallback>
                  </Avatar.Avatar>
                  <h3 className="font-medium">{item.fullName}</h3>
                </div>
              </Card.CardHeader>
              <Card.CardContent>
                <p className="text-slate-700 text-[14px]">{item.message}</p>
              </Card.CardContent>
            </Card.Card>
          ))}
        </div>
      </section>
    </main>
  );
}
