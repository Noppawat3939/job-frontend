import {
  Alert,
  BadgeApplicationStatus,
  Button,
  Card,
  JobDetailCard,
  LayoutWithSidebar,
  Skeleton,
} from "@/components";
import { DATE_FORMAT, QUERY_KEY } from "@/constants";
import { formatDate, generateMenusSidebar, isUndifined } from "@/lib";
import { companyService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import Profile from "@/assets/profile-user.svg";
import Image from "next/image";

const initialDialogState = {
  open: false,
  title: "",
  onOk: () => null,
  onCancel: () => null,
};

export default function ViewApplyJob() {
  const pathname = usePathname();
  const params = useParams() as { apply_id: string };

  const [alertUpdateStatatusDialog, setAlertUpdateStatusDialog] = useState<{
    open: boolean;
    title: string;
    onOk: <A>(arg?: A) => void;
    onCancel: <A>(arg?: A) => void;
  }>(initialDialogState);

  const { companyMenus: menu } = useMemo(
    () => generateMenusSidebar(pathname),
    [pathname]
  );

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_JOB_APPLIED],
    queryFn: () => companyService.fetchJobAppliedById(Number(params.apply_id)),
    enabled: !isUndifined(params.apply_id),
    select: ({ data }) => data,
  });

  const userData: { key: string; label: string; value?: ReactNode }[] = [
    { key: "email", label: "Email", value: data?.user.email },
    {
      key: "full_name",
      label: "Full Name",
      value: `${data?.user.firstName || ""} ${data?.user.lastName || ""}`,
    },
    {
      key: "applied_at",
      label: "Applied at",
      value: formatDate(data?.applicationDate, DATE_FORMAT),
    },
    {
      key: "application_status",
      label: "Status",
      value: data?.applicationStatus && (
        <BadgeApplicationStatus status={data.applicationStatus} />
      ),
    },
  ];

  const handleDialog = (active: "update" | "reject") => {
    setAlertUpdateStatusDialog((prev) => {
      if (active === "update")
        return {
          ...prev,
          title: `Are you sure update ?`,
          open: true,
          onCancel: () => {
            setAlertUpdateStatusDialog(initialDialogState);
          },
        };

      return {
        ...prev,
        open: true,
        title: `Are you sure reject application?`,
      };
    });
  };

  return (
    <LayoutWithSidebar menu={menu}>
      <div className="flex flex-col space-y-4">
        <section>
          <Card.Card className="border-0">
            <Card.CardHeader>
              <div className="flex justify-between">
                <Card.CardTitle className="text-slate-700">
                  {"Candidate Profile"}
                </Card.CardTitle>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleDialog("update")}
                    variant="sky-shadow"
                  >
                    {"Update status"}
                  </Button>
                  <Button
                    onClick={() => handleDialog("reject")}
                    variant={"destructive-outline"}
                  >
                    {"Reject application"}
                  </Button>
                </div>
              </div>
            </Card.CardHeader>
            <Card.CardContent>
              <div className="flex flex-col">
                <div className="flex justify-center mb-4">
                  {data?.user.userProfile ? (
                    <picture className="border rounded-full p-1">
                      <img
                        loading="lazy"
                        alt="profile"
                        className="w-[100px] rounded-full h-[100px] object-cover"
                        src={data.user.userProfile}
                      />
                    </picture>
                  ) : (
                    <Image
                      src={Profile}
                      alt="profile"
                      className="w-[100px]  h-[100px] rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {userData.map((item) => (
                    <div className="flex" key={item.key}>
                      <label
                        className="flex-1 font-medium text-slate-700"
                        htmlFor={item.key}
                      >
                        {item.label}
                      </label>
                      <span className="flex-1" aria-label={`data_${item.key}`}>
                        {isLoading ? (
                          <Skeleton className="w-8/12 h-[18px]" />
                        ) : (
                          item.value
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card.CardContent>
          </Card.Card>
        </section>
        <section>
          <JobDetailCard
            hideApply
            hideFavorite
            {...data?.job}
            loading={isLoading}
          />
        </section>
      </div>

      <Alert
        onOpenChange={(open) =>
          setAlertUpdateStatusDialog((prev) => ({ ...prev, open }))
        }
        {...alertUpdateStatatusDialog}
      />
    </LayoutWithSidebar>
  );
}
