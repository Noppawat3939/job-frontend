import {
  BriefcaseBusiness,
  FileText,
  User as UserIcon,
  UserRoundCheck,
  Users,
} from "lucide-react";
import { eq } from ".";
import type { User } from "@/types/user";

export const generateMenusSidebar = (pathname: string, user?: User) => {
  const companyMenus = [
    {
      items: [
        {
          label: "Jobs",
          value: "jobs",
          path: "/company",
          active: eq(pathname, "/company"),
          leftIcon: BriefcaseBusiness,
        },
        {
          label: "Job applied",
          value: "jop applied",
          path: "/company/applied",
          leftIcon: FileText,
          active: eq(pathname, "/company/applied"),
        },
      ],
    },
  ];

  const adminMenus = [
    {
      items: [
        {
          label: "Accouts",
          value: "accounts",
          leftIcon: Users,
          hide: user?.role && ["employer", "admin"].includes(user.role),
          path: "/admin?tab=accounts",
          active: eq(pathname, "accounts"),
        },
        {
          label: "Jobs",
          value: "jobs",
          leftIcon: BriefcaseBusiness,
          path: "/admin?tab=jobs",
          active: eq(pathname, "jobs"),
        },
        {
          label: "Subscriptions",
          value: "subscriptions",
          leftIcon: UserRoundCheck,
          path: "/admin/subscription",
          active: eq(pathname, "/admin/subscription"),
        },
      ],
    },
    {
      heading: "Setting",
      items: [
        {
          label: "Profile",
          value: "profile",
          leftIcon: UserIcon,
          disabled: true,
        },
      ],
    },
  ];

  return { companyMenus, adminMenus };
};
