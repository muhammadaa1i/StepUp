"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import UsersTable from "@/components/admin/users/UsersTable";
import UsersPagination from "@/components/admin/users/UsersPagination";
import { useAdminUsersPage } from "@/hooks/useAdminUsersPage";

export default function AdminUsersPage() {
  const { t, locale, currentUser, users, isLoading, pagination, handlePageChange } = useAdminUsersPage();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('admin.users.title')}</h1>
          <p className="text-gray-600 mt-2">{t('admin.users.subtitle')}</p>
        </div>

        <UsersTable users={users} isLoading={isLoading} locale={locale} currentUserId={currentUser?.id} />

        <UsersPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          count={users.length}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          t={t}
        />
      </div>
    </AdminLayout>
  );
}
