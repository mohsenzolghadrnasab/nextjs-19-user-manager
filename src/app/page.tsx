import { Suspense } from 'react';
import CreateUserForm from '@/app/components/CreateUserForm';
import UserSearch from '@/app/components/UserSearch';
import Pagination from '@/app/components/Pagination';
import { getUsers } from '@/lib/db';
import type { User } from '@/types'; // ✅ import نوع

// ✅ جایگزین any با User
async function UserList({ users }: { users: User[] }) {
  return (
    <div className="space-y-3">
      {users.map(user => (
        <div key={user.id} className="p-4 bg-white border rounded shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            {/* ویرایش/حذف */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function UsersPage({
  searchParams
}: {
  searchParams?: { q?: string; page?: string }
}) {
  const query = searchParams?.q || '';
  const page = Number(searchParams?.page) || 1;
  const perPage = 5;

  const { users, total } = await getUsers(page, perPage, query);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">مدیریت کاربران</h1>

      <CreateUserForm />
      <UserSearch />

      <Suspense key={`${query}-${page}`} fallback={<p className="text-center py-4">در حال بارگذاری...</p>}>
        <UserList users={users} />
        <Pagination total={total} perPage={perPage} />
      </Suspense>
    </div>
  );
}