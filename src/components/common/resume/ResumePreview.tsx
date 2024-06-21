import { Card } from "@/components";
import { useResumeStore } from "@/store";

export default function ResumePreview() {
  const { data } = useResumeStore();

  //   console.log(data);

  return (
    <Card.Card className="bg-white h-full w-full p-[20px]">
      <Card.CardHeader className="px-[30px] pt-[30px] rounded-md bg-slate-300">
        <div className="flex justify-between items-start">
          <Card.CardTitle>{`${data.firstName} ${data.lastName}`}</Card.CardTitle>
          <Card.CardDescription aria-label="address">
            {data.address}
          </Card.CardDescription>
        </div>
      </Card.CardHeader>
      <Card.CardContent className="w-full flex flex-col gap-[16px] py-[10px] px-0 h-full">
        <section>
          <h2 className="text-lg font-medium">{"About me"}</h2>
          <p className="text-sm">{data.about}</p>
        </section>
        <section>
          <h2 className="text-xl font-medium">{"Career Experience"}</h2>
          <div className="flex justify-between items-baseline">
            <h4>Position at Company name</h4>
            <p>{`${data.work?.[0]?.startDate} - ${data.work?.[0]?.endDate}`}</p>
          </div>
        </section>
      </Card.CardContent>
    </Card.Card>
  );
}
