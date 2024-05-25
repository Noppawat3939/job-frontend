"use client";

import {
  type DataTableProps,
  DataTable,
  Badge,
  Alert,
  BadgeJobApprove,
  LayoutWithSidebar,
  BadgeRoleUser,
  BadgeUserApprove,
  Lazyload,
} from "@/components";
import type { User as UserType, UserStatus } from "@/types/user";
import { USER_STATUS } from "@/constants";
import { useCallback, useState, useTransition } from "react";
import {
  cn,
  eq,
  mappingJobApproveLabel,
  mappingWorkStyle,
  mappingWorkingStyleClass,
} from "@/lib";
import { useApproveUserHandler, useFetchHomeAdmin } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { BriefcaseBusiness, User, Users } from "lucide-react";
import { userStore } from "@/store";

type PickedUser = Pick<
  UserType,
  "id" | "email" | "firstName" | "lastName" | "role"
>;

type RowData = PickedUser & { key: string; approve: UserStatus };

const initial = {
  alertProps: {
    open: false,
    title: "",
    description: "",
    onOk: () => {},
    onCancel: () => {},
    okText: "",
    cancelText: "",
  },
};

export default function AdminPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as "jobs" | "accounts";

  const router = useRouter();

  const { user } = userStore((store) => ({ user: store.user }));

  const {
    userQuery,
    jobQuery,
    state: { users, jobs },
  } = useFetchHomeAdmin(tabParam);

  const [alertApproveUser, setAlertApproveUser] = useState(initial.alertProps);

  const [, startTransition] = useTransition();

  const selectedAccountsTab = eq(tabParam, "accounts");

  const alertError = useCallback(
    () =>
      setAlertApproveUser({
        ...alertApproveUser,
        title: "Can not approve user",
        description: "Please try again",
        onOk: () => setAlertApproveUser((prev) => ({ ...prev, open: false })),
      }),
    [alertApproveUser]
  );

  const handleApproveCompleted = () => {
    userQuery.refetch();
    startTransition(() =>
      setAlertApproveUser((prev) => ({ ...prev, open: false }))
    );
  };

  const { handle } = useApproveUserHandler(handleApproveCompleted, alertError);

  const handleOpenAlertApprove = (data: RowData) => {
    const alertState = {} as typeof alertApproveUser;

    const id = +data.key;

    if (eq(data.approve, USER_STATUS.APPROVE)) {
      alertState.title = "Are you want to reject or un approve?";
      alertState.cancelText = "Reject";
      alertState.okText = "Un approve";
      alertState.onCancel = () => handle.reject(id);
      alertState.onOk = () => handle.unApprove(id);
    }
    if (eq(data.approve, USER_STATUS.REJECT)) {
      alertState.title = "Are you want to approve or un approve?";
      alertState.okText = "Approve";
      alertState.cancelText = "Un approve";
      alertState.onOk = () => handle.approve(id);
      alertState.onCancel = () => handle.unApprove(id);
    }
    if (eq(data.approve, USER_STATUS.UN_APPROVE)) {
      alertState.title = "Are you want to approve or reject?";
      alertState.okText = "Approve";
      alertState.cancelText = "Reject";
      alertState.onOk = () => handle.approve(id);
      alertState.onCancel = () => handle.reject(id);
    }

    setAlertApproveUser({
      ...alertApproveUser,
      ...alertState,
      open: true,
      description: data.email,
    });
  };

  const accountColumns = [
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      key: "firstName",
      title: "First Name",
      dataIndex: "firstName",
      width: "15%",
    },
    {
      key: "lastName",
      title: "Last Name",
      dataIndex: "lastName",
      width: "15%",
    },
    {
      key: "role",
      title: "Role",
      dataIndex: "role",
      width: "16%",
      render: (role: string) => <BadgeRoleUser role={role} />,
    },
    {
      key: "approve",
      title: "Approve",
      dataIndex: "approve",
      width: "14%",
      render: (value: string, data: any) => {
        const status = value as UserStatus;

        return (
          <div className="flex">
            <BadgeUserApprove
              onClick={() => handleOpenAlertApprove(data)}
              status={status}
            />
          </div>
        );
      },
    },
  ];

  const jobColumns = [
    { key: "company", title: "Company", dataIndex: "company", width: "10%" },
    { key: "position", title: "Position", dataIndex: "position", width: "20%" },

    {
      key: "fulltime",
      title: "Job type",
      dataIndex: "fulltime",
      width: "8%",
    },
    {
      key: "active",
      title: "Job approve",
      dataIndex: "active",
      width: "8%",
      render: (active: string) => (
        <BadgeJobApprove
          status={active}
          text={
            mappingJobApproveLabel[
              active as keyof typeof mappingJobApproveLabel
            ]
          }
        />
      ),
    },
    {
      key: "urgent",
      title: "Urgent",
      dataIndex: "urgent",
      width: "10%",
      render: (text: string) => (
        <p
          className={`${text ? "text-red-500 font-medium" : "text-slate-900"}`}
        >
          {text || "-"}
        </p>
      ),
    },
    {
      key: "salary",
      title: "Salary (THB)",
      dataIndex: "salary",
      width: "15%",
    },
    {
      key: "style",
      title: "Work style",
      dataIndex: "style",
      width: "14%",
      render: (style: string, rowData: any) => {
        const data = rowData;

        return (
          <Badge
            className={cn(
              "w-[120px] flex justify-center",
              mappingWorkingStyleClass[String(data.style)]
            )}
          >
            {mappingWorkStyle[style as keyof typeof mappingWorkStyle]}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      title: "Created At",
      dataIndex: "createdAt",
      width: "12%",
    },
  ];

  const renderTableProps = () => {
    if (selectedAccountsTab)
      return { columns: accountColumns, data: users as DataTableProps["data"] };

    return { columns: jobColumns, data: jobs as DataTableProps["data"] };
  };

  const loading = [userQuery.isFetching, jobQuery.isFetching].some(Boolean);

  return (
    <LayoutWithSidebar
      menu={[
        {
          items: [
            {
              label: "Accouts",
              value: "accounts",
              leftIcon: Users,
              hide: user?.role && ["employer", "admin"].includes(user.role),
              path: "/admin?tab=accounts",
              active: eq(tabParam, "accounts"),
            },
            {
              label: "Jobs",
              value: "jobs",
              leftIcon: BriefcaseBusiness,
              path: "/admin?tab=jobs",
              active: eq(tabParam, "jobs"),
            },
          ],
        },
        {
          heading: "Setting",
          items: [
            {
              label: "Profile",
              value: "profile",
              leftIcon: User,
              disabled: true,
            },
          ],
        },
      ]}
    >
      <div className="w-full h-full">
        <div className="px-[24px]">
          <Lazyload>
            <DataTable
              loading={loading}
              name="accounts"
              data={renderTableProps().data}
              columns={renderTableProps().columns}
              onRow={(cb) =>
                selectedAccountsTab
                  ? undefined
                  : router.push(`/admin/job/${cb?.key}`)
              }
            />
          </Lazyload>
        </div>
        <Alert
          onOpenChange={() => setAlertApproveUser(initial.alertProps)}
          {...alertApproveUser}
        />
      </div>
    </LayoutWithSidebar>
  );
}
