import { Button, Select } from "@/components";

import Link from "next/link";

const ROLES = ["Job Seeker", "Employer"];

export default function Navbar() {
  return (
    <nav className="px-4 py-5 flex items-center justify-between">
      <div className="flex items-center space-x-10">
        <span
          aria-label="logo"
          className="text-4xl max-md:text-3xl font-semibold text-sky-500"
        >
          <Link href="/" shallow>
            {"Jobify"}
          </Link>
        </span>
        <Select.Select>
          <Select.SelectTrigger className="w-[160px]">
            <Select.SelectValue placeholder="Job seeker" />
          </Select.SelectTrigger>
          <Select.SelectContent>
            {ROLES.map((role) => (
              <Select.SelectItem
                key={role}
                role="role"
                value={role.toLowerCase().replaceAll(" ", "_")}
              >
                {role}
              </Select.SelectItem>
            ))}
          </Select.SelectContent>
        </Select.Select>
      </div>
      <div className="flex space-x-5">
        <Button size="sm">Post your job</Button>
        <Button size="sm" variant="outline">
          Sign in
        </Button>
      </div>
    </nav>
  );
}
