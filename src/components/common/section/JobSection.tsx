import { noSpace } from "@/lib";

type JobSectionProps = {
  title: string;
  items?: string[];
};
export default function JobSection({ title, items }: JobSectionProps) {
  if (!items?.at(0)) return null;

  return (
    <div>
      <h3 aria-label="job-title" className="text-xl font-medium text-slate-800">
        {title}
      </h3>
      <ol>
        {items.map((item, idx) => (
          <li key={`${noSpace(title)}_${idx}`} className="text-slate-700">
            {`${idx + 1}. ${item}`}
          </li>
        ))}
      </ol>
    </div>
  );
}
