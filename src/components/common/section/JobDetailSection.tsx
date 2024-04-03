import { noSpace } from "@/lib";

type JobDetailSectionProps = {
  title: string;
  items?: string[];
};
export default function JobDetailSection({
  title,
  items,
}: JobDetailSectionProps) {
  if (!items?.at(0)) return null;

  return (
    <div>
      <h3
        aria-label="job-title"
        className="text-xl font-medium text-slate-800 max-md:text-lg"
      >
        {title}
      </h3>
      <ul className="list-disc">
        {items.map((item, idx) => (
          <li
            key={`${noSpace(title)}_${idx}`}
            className="text-slate-700 ml-10 max-md:text-[15px]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
