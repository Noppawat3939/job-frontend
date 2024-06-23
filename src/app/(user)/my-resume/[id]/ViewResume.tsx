import { docsService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function ViewResume() {
  const param: { id: string } = useParams();

  const { data } = useQuery({
    queryKey: ["user-resume", param.id],
    queryFn: () => docsService.getUserResumeById(Number(param.id)),
    select: ({ data }) => data,
  });

  return <div>{`View ${param.id}`}</div>;
}
