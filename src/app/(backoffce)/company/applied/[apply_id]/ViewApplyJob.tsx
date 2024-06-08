import {
  Alert,
  BadgeApplicationStatus,
  Button,
  Card,
  JobDetailCard,
  LayoutWithSidebar,
  SelectItem,
  Show,
  Skeleton,
  toast,
} from "@/components";
import { DATE_FORMAT, QUERY_KEY } from "@/constants";
import { formatDate, generateMenusSidebar, isUndifined } from "@/lib";
import { companyService } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import Profile from "@/assets/profile-user.svg";
import Image from "next/image";
import { ApplicationStatus, Nullable, ServiceErrorResponse } from "@/types";
import { AxiosError } from "axios";
import { ChevronLeft } from "lucide-react";

const initialDialogState = {
  active: null,
  open: false,
  title: "",
  onOk: () => null,
  onCancel: () => null,
};

export default function ViewApplyJob() {
  const pathname = usePathname();
  const params = useParams() as { apply_id: string };
  const router = useRouter();

  const [alertUpdateStatatusDialog, setAlertUpdateStatusDialog] = useState<{
    open: boolean;
    title: string;
    onOk: <A>(arg?: A) => void;
    onCancel: <A>(arg?: A) => void;
    active: Nullable<"update" | "reject">;
  }>(initialDialogState);
  const [selectedStatus, setSelectedStatus] = useState("");

  const { companyMenus: menu } = useMemo(
    () => generateMenusSidebar(pathname),
    [pathname]
  );

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.GET_JOB_APPLIED, params.apply_id],
    queryFn: () => companyService.fetchJobAppliedById(Number(params.apply_id)),
    enabled: !isUndifined(params.apply_id),
    select: ({ data }) => data,
  });

  const { mutate: updateApplicationStatus } = useMutation({
    mutationFn: companyService.updateApplicationStatus,
    onSuccess: () => {
      toast({
        title: "Updated application is successfully",
        duration: 1500,
        variant: "success",
      });
      refetch();
    },
    onError: (e) => {
      const err = e as AxiosError;

      const error = err.response as ServiceErrorResponse;

      toast({
        title: error.data.message,
        variant: "destructive",
        duration: 1500,
      });
    },
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

  const handleDialog = (
    active: "update" | "reject",
    status?: ApplicationStatus
  ) => {
    setAlertUpdateStatusDialog((prev) => {
      if (active === "update")
        return {
          ...prev,
          active,
          title: `Are you sure update application to ${status} ?`,
          open: true,
          onCancel: () => {
            setSelectedStatus("");
            setAlertUpdateStatusDialog(initialDialogState);
          },
          onOk: () =>
            status && updateApplicationStatus({ id: params.apply_id, status }),
        };

      return {
        ...prev,
        active,
        open: true,
        title: "Are you sure reject application?",
        onCancel: () => {
          setSelectedStatus("");
          setAlertUpdateStatusDialog(initialDialogState);
        },
        onOk: () =>
          updateApplicationStatus({ id: params.apply_id, status: "rejected" }),
      };
    });
  };

  const statusOptions = useMemo(() => {
    const mappingStatus = {
      applied: [{ label: "reviewing", value: "reviewing" }],
      reviewing: [
        { label: "interviewing", value: "interviewing" },
        { label: "offering", value: "offering" },
        { label: "offered", value: "offered" },
      ],
      interviewing: [
        { label: "offering", value: "offering" },
        { label: "offered", value: "offered" },
      ],
      offering: [{ label: "offered", value: "offered" }],
    } as Record<
      ApplicationStatus,
      { label: ApplicationStatus; value: ApplicationStatus }[]
    >;
    return data ? mappingStatus?.[data?.applicationStatus] : [];
  }, [data]);

  return (
    <LayoutWithSidebar menu={menu}>
      <div className="flex flex-col space-y-4">
        <section>
          <Card.Card className="border-0">
            <Card.CardHeader>
              <div className="flex justify-between">
                <div className="flex items-baseline space-x-2">
                  <Button
                    role="back"
                    onClick={router.back}
                    size="icon"
                    variant="link"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Card.CardTitle className="text-slate-700">
                    {"Candidate Profile"}
                  </Card.CardTitle>
                </div>
                <Show
                  when={
                    data &&
                    !["rejected", "offered"].includes(data?.applicationStatus)
                  }
                >
                  <div className="flex space-x-2">
                    <SelectItem
                      className="w-[180px]"
                      placeholder={"Update status"}
                      verticel
                      value={selectedStatus}
                      items={statusOptions || []}
                      onChange={(value) => {
                        setSelectedStatus(value);
                        handleDialog("update", value as ApplicationStatus);
                      }}
                    />
                    <Button
                      onClick={() => handleDialog("reject")}
                      variant={"destructive-outline"}
                    >
                      {"Reject application"}
                    </Button>
                  </div>
                </Show>
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
        onOpenChange={(open) => {
          if (selectedStatus) {
            setSelectedStatus("");
          }

          setAlertUpdateStatusDialog((prev) => ({ ...prev, open }));
        }}
        okText={"Confirm"}
        okButtonProps={{
          variant:
            alertUpdateStatatusDialog.active === "update"
              ? "default"
              : "destructive",
        }}
        {...alertUpdateStatatusDialog}
      />
    </LayoutWithSidebar>
  );
}
