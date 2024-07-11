"use client";

import {
  Alert,
  DataTable,
  Dialog,
  LayoutWithSidebar,
  toast,
} from "@/components";
import { generateMenusSidebar } from "@/lib";
import { userStore } from "@/store";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

export default function SubscriptionListPage() {
  const { user } = userStore();
  const pathname = usePathname();

  const [previewSlip, setPreviewSlip] = useState({ open: false, image: "" });

  const { adminMenus: menu } = useMemo(
    () => generateMenusSidebar(pathname, user),
    [user]
  );

  return (
    <LayoutWithSidebar menu={menu}>
      <div className="w-full">
        <DataTable
          name="subscriptions"
          lockHeader
          data={Array.from({ length: 1 }).fill({
            email: "test@gmail.com",
            ref: "REF123213",
            status: "pending",
            stamptUser: "Jame",
            createdAt: "2024/01/31",
          })}
          columns={[
            { key: "email", dataIndex: "email", title: "Email", width: "20%" },
            { key: "ref", dataIndex: "ref", title: "Ref No.", width: "15%" },
            {
              key: "status",
              dataIndex: "status",
              title: "Status",
              width: "15%",
            },
            {
              key: "stamptUser",
              dataIndex: "stamptUser",
              title: "Stampt by",
              width: "25%",
            },
            {
              key: "createdAt",
              dataIndex: "createdAt",
              title: "Created at",
              width: "20%",
            },
          ]}
          onRow={(row) => setPreviewSlip({ open: true, image: row?.image })}
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
        content
      </Alert>
    </LayoutWithSidebar>
  );
}
