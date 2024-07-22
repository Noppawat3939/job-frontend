"use client";

import {
  Alert,
  Badge,
  Button,
  DataTable,
  Dropdown,
  LayoutWithSidebar,
  SelectItem,
  toast,
} from "@/components";
import { DATE_TIME_FORMAT, QUERY_KEY, SUBSCRIBE_STATUS } from "@/constants";
import {
  cn,
  eq,
  formatDate,
  generateMenusSidebar,
  isNull,
  mappingSubscribeStatusClass,
  mappingTransactionStatusClass,
} from "@/lib";
import { subscriptionService } from "@/services";
import { userStore } from "@/store";
import { Nullable, SubscriptionStatus, Subscriptions } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ListFilter } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

interface IFSubscription {
  email: string;
  key: number;
  paidAt: string;
  refNumber: string;
  status: SubscriptionStatus;
  subscribePlan: string;
  subscribedAt: string;
}

export default function SubscriptionListPage() {
  const { user } = userStore();
  const pathname = usePathname();

  const [previewSlip, setPreviewSlip] = useState({ open: false, image: "" });
  const [subscriptionData, setSubscriptionData] =
    useState<Nullable<IFSubscription>>(null);
  const [filterParams, setFilterParams] = useState<{
    status: Nullable<SubscriptionStatus>;
  }>({ status: null });

  const { data, refetch: refetchData } = useQuery({
    queryKey: [QUERY_KEY.SUBSCRIPTIONS, filterParams.status],
    queryFn: () =>
      subscriptionService.getSubscribeList({
        status: filterParams.status
          ? [filterParams.status]
          : [SUBSCRIBE_STATUS.PENDING, SUBSCRIBE_STATUS.SUBSCRIBED],
      }),
    select: (res) => res.data,
  });

  const confirmMutation = useMutation({
    mutationFn: subscriptionService.confrimVerifySubscription,
    onError: () =>
      toast({
        title: "Can't confirm subscription",
        variant: "destructive",
        duration: 1500,
      }),
    onSuccess: () => onMutationSuccess(),
  });

  const rejectMutation = useMutation({
    mutationFn: subscriptionService.confirmRejectSubscription,
    onError: () =>
      toast({
        title: "Can't reject subscription",
        variant: "destructive",
        duration: 1500,
      }),
    onSuccess: () => onMutationSuccess(),
  });

  const onMutationSuccess = () => {
    toast({
      title: "Updated status is successfully",
      variant: "success",
      duration: 1000,
    });
    setPreviewSlip({ open: false, image: "" });
    refetchData();
  };

  const { adminMenus: menu } = useMemo(
    () => generateMenusSidebar(pathname, user),
    [user]
  );

  return (
    <LayoutWithSidebar menu={menu}>
      <div className="flex justify-between px-4 py-2">
        <SelectItem
          label="Subscription status"
          verticel
          className="w-[200px]"
          onChange={(selected) => {
            const mapping = {
              pending: SUBSCRIBE_STATUS.PENDING,
              subscribed: SUBSCRIBE_STATUS.SUBSCRIBED,
              unsubscribe: SUBSCRIBE_STATUS.UN_SUBSCRIBE,
            };
            setFilterParams({
              status: mapping[selected as keyof typeof mapping],
            });
          }}
          placeholder="Select status"
          items={[
            { label: "Pending", value: "pending" },
            { label: "Subscribed", value: "subscribed" },
            { label: "Un Subscribe", value: "unsubscribe" },
          ]}
        />

        <Button
          variant={"outline"}
          disabled={isNull(filterParams.status)}
          onClick={() => {
            setFilterParams({ status: null });
            refetchData();
          }}
        >
          <ListFilter className="w-4 h-4 mr-2" />
          {"Clear"}
        </Button>
      </div>
      <div className="w-full">
        <DataTable
          name="subscriptions"
          //@ts-ignore
          data={
            data?.map((item) => ({
              key: item.subscription.id,
              email: item.user.email,
              status: item.subscription.status,
              paymentStatus: item.transaction.status,
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
              width: "20%",
            },
            {
              key: "status",
              dataIndex: "status",
              title: "Status",
              width: "10%",
              render: (status) => (
                <Badge
                  variant="outline"
                  className={cn(
                    mappingSubscribeStatusClass[status as SubscriptionStatus]
                  )}
                >
                  {status}
                </Badge>
              ),
            },
            {
              key: "paymentStatus",
              dataIndex: "paymentStatus",
              title: "Payment",
              width: "10%",
              render: (status) => (
                <Badge
                  variant="outline"
                  className={cn(
                    mappingTransactionStatusClass[
                      status as keyof typeof mappingTransactionStatusClass
                    ]
                  )}
                >
                  {status}
                </Badge>
              ),
            },
            {
              key: "refNumber",
              dataIndex: "refNumber",
              title: "Ref No.",
              width: "10%",
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
            setSubscriptionData(row as unknown as IFSubscription);
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
        onOk={() =>
          subscriptionData &&
          eq(subscriptionData.status, "pending") &&
          confirmMutation.mutate({
            id: String(subscriptionData.key),
            refNumber: subscriptionData.refNumber,
          })
        }
        onCancel={() =>
          subscriptionData?.refNumber &&
          eq(subscriptionData.status, "pending") &&
          rejectMutation.mutate({ refNumber: subscriptionData?.refNumber })
        }
        okButtonProps={{
          variant: "secondary",
          className: cn(
            subscriptionData && !eq(subscriptionData.status, "pending")
              ? "hidden"
              : undefined
          ),
        }}
        cancelText="Reject"
        cancelButtonProps={{
          variant: "destructive-outline",
          className: cn(
            subscriptionData && !eq(subscriptionData.status, "pending")
              ? "hidden"
              : undefined
          ),
        }}
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
