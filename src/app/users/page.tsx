import { Suspense } from 'react';
import CreateUserForm from '@/app/components/CreateUserForm';
import UserList from '@/app/components/UserList';

export default function UsersPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">مدیریت کاربران</h1>

      <CreateUserForm />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">لیست کاربران</h2>

        <Suspense fallback={<p className="text-center py-4">در حال بارگذاری کاربران...</p>}>
          <UserList />
        </Suspense>
      </div>
    </div>
  );
}