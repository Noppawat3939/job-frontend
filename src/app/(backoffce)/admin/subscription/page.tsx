"use client";

import { Alert, DataTable, LayoutWithSidebar, toast } from "@/components";
import { DATE_TIME_FORMAT, SUBSCRIBE_STATUS } from "@/constants";
import { eq, formatDate, generateMenusSidebar } from "@/lib";
import { subscriptionService } from "@/services";
import { userStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

export default function SubscriptionListPage() {
  const { user } = userStore();
  const pathname = usePathname();

  const [previewSlip, setPreviewSlip] = useState({ open: false, image: "" });

  const { data } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => subscriptionService.getSubscribeList({ status: "pending" }),
    select: (res) => res.data,
  });

  const { adminMenus: menu } = useMemo(
    () => generateMenusSidebar(pathname, user),
    [user]
  );

  return (
    <LayoutWithSidebar menu={menu}>
      <div className="w-full">
        <DataTable
          name="subscriptions"
          //@ts-ignore
          data={
            data?.map((item) => ({
              key: item.subscription.id,
              email: item.user.email,
              status: item.transaction.status,
              refNumber: item.transaction.refNumber,
              subscribePlan: item.subscription.type,
              subscribedAt: eq(
                item.subscription.status,
                SUBSCRIBE_STATUS.SUBSCRIBED
              )
                ? formatDate(item.subscription.updatedAt, DATE_TIME_FORMAT)
                : "",
              paidAt: formatDate(item.transaction.createdAt, DATE_TIME_FORMAT),
            })) || []
          }
          columns={[
            {
              key: "email",
              dataIndex: "email",
              title: "Email",
              width: "25%",
            },
            {
              key: "status",
              dataIndex: "status",
              title: "Status",
              width: "15%",
            },
            {
              key: "refNumber",
              dataIndex: "refNumber",
              title: "Ref No.",
              width: "15%",
            },
            {
              key: "subscribePlan",
              dataIndex: "subscribePlan",
              title: "Subscribe Plan",
              width: "15%",
            },
            {
              key: "subscribedAt",
              dataIndex: "subscribedAt",
              title: "Subscribed at",
              width: "15%",
            },
            {
              key: "paidAt",
              dataIndex: "paidAt",
              title: "Paid at",
              width: "15%",
            },
          ]}
          onRow={(row) => {
            const slip = data?.find(
              (item) => item.subscription.id === Number(row?.key)
            )?.transaction.slipImage;

            if (slip) {
              setPreviewSlip({ open: true, image: slip });
            }
          }}
        />
      </div>
      <Alert
        title="Slip uploaded"
        open={previewSlip.open}
        onOpenChange={(open) => setPreviewSlip((prev) => ({ ...prev, open }))}
        okText="Confirm Verify"
        onOk={() => {
          toast({
            title: "Updated status is successfully",
            variant: "success",
            duration: 1000,
          });
          setPreviewSlip({ open: false, image: "" });
        }}
        okButtonProps={{ variant: "secondary" }}
        cancelText="Reject"
        cancelButtonProps={{ variant: "destructive" }}
      >
        <center>
          <picture>
            <img
              src={previewSlip.image}
              alt="slip-image"
              className="w-[240px]"
              loading="lazy"
            />
          </picture>
        </center>
      </Alert>
    </LayoutWithSidebar>
  );
}
