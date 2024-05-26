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
  SelectItem,
  Show,
  Button,
} from "@/components";
import type { User as UserType, UserStatus } from "@/types/user";
import { JOB_STATUS, ROLE, USER_STATUS } from "@/constants";
import { useCallback, useMemo, useState, useTransition } from "react";
import {
  cn,
  eq,
  generateMenusSidebar,
  isUndifined,
  mappingJobApproveLabel,
  mappingWorkStyle,
  mappingWorkingStyleClass,
} from "@/lib";
import { useApproveUserHandler, useFetchHomeAdmin } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { ListFilter } from "lucide-react";
import { userStore } from "@/store";

type PickedUser = Pick<
  UserType,
  "id" | "email" | "firstName" | "lastName" | "role"
>;

type RowData = PickedUser & { key: string; approve: UserStatus };

type FilterKey = "company" | "role" | "user_status" | "job_status";

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
  const [filterParams, setFilterParams] = useState<Map<FilterKey, string>>(
    new Map()
  );

  const [, startTransition] = useTransition();

  const selectedAccountsTab = eq(tabParam, "accounts");

  const handleFilterChange = useCallback(
    (key: FilterKey, value: string) =>
      setFilterParams((prevMap) => new Map(prevMap.set(key, value))),
    []
  );

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
    if (selectedAccountsTab) {
      const hasFiltered = ["role", "user_status"].some((key) =>
        filterParams.has(key as FilterKey)
      );

      const filterdAll = ["role", "user_status"].every((key) =>
        filterParams.has(key as FilterKey)
      );

      const filteredData = filterdAll
        ? users?.filter(
            (user) =>
              eq(user.approve, filterParams.get("user_status")) &&
              eq(user.role, filterParams.get("role"))
          )
        : hasFiltered
        ? users?.filter(
            (user) =>
              eq(user.role, filterParams.get("role")) ||
              eq(user.approve, filterParams.get("user_status"))
          )
        : (users as DataTableProps["data"]);

      return {
        columns: accountColumns,
        data: filteredData || [],
      };
    } else {
      const filterdAll = ["company", "job_status"].every((key) =>
        filterParams.has(key as FilterKey)
      );

      const hasFiltered = ["company", "job_status"].some((key) =>
        filterParams.has(key as FilterKey)
      );
      const filteredData = filterdAll
        ? jobs?.filter(
            (job) =>
              eq(job.active, filterParams.get("job_status")) &&
              eq(job.company, filterParams.get("company"))
          )
        : hasFiltered
        ? jobs?.filter(
            (job) =>
              eq(filterParams.get("company"), job.company) ||
              eq(job.active, filterParams.get("job_status"))
          )
        : (jobs as DataTableProps["data"]);

      return { columns: jobColumns, data: filteredData || [] };
    }
  };

  const renderFilterItems = () => {
    const roleOptions = ROLE.map((value) => ({ label: value, value }));

    const companyOptions = !isUndifined(jobQuery.data?.data)
      ? //@ts-ignore
        [...new Set(jobQuery!.data!.data.map((d) => d.company))].map(
          (value) => ({ label: value, value })
        )
      : [];

    const approveOptions = selectedAccountsTab
      ? Object.values(USER_STATUS).map((value) => ({ label: value, value }))
      : Object.values(JOB_STATUS).map((value) => ({ label: value, value }));

    return (
      <div className="flex w-full space-x-[36px] justify-between items-end">
        <div className="flex flex-[.7] space-x-2 w-full">
          <Show when={selectedAccountsTab}>
            <SelectItem
              verticel
              items={roleOptions}
              label="Role"
              value={
                isUndifined(filterParams.get("role"))
                  ? ""
                  : filterParams.get("role")
              }
              onChange={(role) => handleFilterChange("role", role)}
            />
          </Show>
          <Show when={!selectedAccountsTab}>
            <SelectItem
              verticel
              items={companyOptions}
              label="Company"
              value={
                isUndifined(filterParams.get("company"))
                  ? ""
                  : filterParams.get("company")
              }
              onChange={(company) => handleFilterChange("company", company)}
            />
          </Show>
          <SelectItem
            items={approveOptions}
            verticel
            label={`${selectedAccountsTab ? "User" : "Job"} Approve`}
            value={
              selectedAccountsTab
                ? isUndifined(filterParams.get("user_status"))
                  ? ""
                  : filterParams.get("user_status")
                : isUndifined(filterParams.get("job_status"))
                ? ""
                : filterParams.get("job_status")
            }
            onChange={(status) =>
              selectedAccountsTab
                ? handleFilterChange("user_status", status)
                : handleFilterChange("job_status", status)
            }
          />
        </div>
        <div className="flex space-x-2 flex-[.2]">
          <Button
            variant={"purple-shadow"}
            disabled={filterParams.size === 0}
            className="w-full"
            onClick={() => setFilterParams(new Map())}
          >
            <ListFilter className="w-4 h-4 mr-2" />
            {"Clear"}
          </Button>
        </div>
      </div>
    );
  };

  const loading = [userQuery.isFetching, jobQuery.isFetching].some(Boolean);

  const menu = useMemo(
    () => generateMenusSidebar(tabParam, user),
    [user, tabParam]
  );

  return (
    <LayoutWithSidebar menu={menu.adminMenus}>
      <div className="w-full h-full">
        <div className="flex space-x-2 bg-white sticky top-0 z-10 py-3 px-4">
          {renderFilterItems()}
        </div>
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
