'use client';

import { handleCreateUser, handleClearUsers } from '@/app/users/create-action';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import type { UserFormState } from '@/types'; // همان نوع

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? 'در حال ارسال...' : 'ایجاد کاربر'}
    </button>
  );
}

export default function CreateUserForm() {
  // ✅ initialState باید با نوع تابع سازگار باشد
  const initialState: UserFormState = { message: undefined };

  const [state, formAction] = useActionState(handleCreateUser, initialState);

  return (
    <div className="mb-8 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">افزودن کاربر جدید</h2>

      <form action={formAction} className="space-y-3">
        {state?.message && (
          <p className={`text-sm ${state.message.includes('موفقیت') ? 'text-green-600' : 'text-red-600'}`}>
            {state.message}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">نام</label>
          <input
            name="name"
            className="w-full p-2 border rounded"
            placeholder="نام کامل"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">ایمیل</label>
          <input
            name="email"
            type="email"
            className="w-full p-2 border rounded"
            placeholder="example@example.com"
            required
          />
        </div>

        <SubmitButton />
      </form>

      <button
        onClick={() => handleClearUsers()}
        className="mt-4 text-sm text-red-600 hover:underline"
      >
        پاک کردن همه کاربران
      </button>
    </div>
  );
}