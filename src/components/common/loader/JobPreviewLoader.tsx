import { Card, Skeleton } from "@/components";

export default function JobPreviewLoader() {
  return (
    <Card.Card className="border border-slate-100 shadow-sm">
      <Card.CardHeader className="flex flex-col space-y-3">
        <div className="flex space-x-3">
          <Skeleton className="w-[50px] h-[50px] rounded-full" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </Card.CardHeader>
      <Card.CardContent>
        <Skeleton className="h-3 w-[300px]" />
        <Skeleton className="h-3 w-[260px] mt-2" />
        <Skeleton className="h-3 w-[200px] mt-4" />
      </Card.CardContent>
    </Card.Card>
  );
}
