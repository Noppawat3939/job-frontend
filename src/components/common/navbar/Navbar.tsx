import { Button, SelectItem } from "@/components";

import Link from "next/link";

const ROLES = ["Job Seeker", "Employer"];

export default function Navbar() {
  return (
    <nav className="px-4 py-5 flex items-center justify-between">
      <div className="flex items-center space-x-10">
        <span
          aria-label="logo"
          className="text-4xl max-md:text-3xl font-semibold bg-gradient-to-t from-sky-500 via-sky-400 to-sky-300 inline-block text-transparent bg-clip-text"
        >
          <Link href="/" shallow>
            {"Jobify"}
          </Link>
        </span>
      </div>
      <div className="flex items-baseline space-x-4">
        <SelectItem
          className="w-[150px]"
          placeholder={ROLES.at(0)}
          items={ROLES.map((role) => ({
            label: role,
            value: role.replaceAll(" ", "_").toLowerCase(),
          }))}
        />

        <Button size="sm">Post your job</Button>
        <Button size="sm" variant="outline">
          Sign in
        </Button>
      </div>
    </nav>
  );
}
