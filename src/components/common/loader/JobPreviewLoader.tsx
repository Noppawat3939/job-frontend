import { Card, Skeleton } from "@/components";

export default function JobPreviewLoader() {
  return (
    <Card.Card>
      <Card.CardHeader className="flex flex-col space-y-3">
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </Card.CardHeader>
      <Card.CardContent>
        <Skeleton className="h-3 w-[300px]" />
        <Skeleton className="h-3 w-[260px] mt-2" />
      </Card.CardContent>
    </Card.Card>
  );
}
