import AdminHeader from "@/src/features/admin/components/AdminHeader";
import AdminSidebar from "@/src/features/admin/components/AdminSidebar";
import ProtectedLayout from "@/src/layout/ProtectedLayout";
import { USER_ROLES } from "@/src/types/user.types";
import React from "react";

type PropType = {
  children: React.ReactNode;
};

const AdminProtectedLayout = ({ children }: PropType) => {
  return (
    <ProtectedLayout role={USER_ROLES.ADMIN}>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader />

          {/* Content Area */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default AdminProtectedLayout;
