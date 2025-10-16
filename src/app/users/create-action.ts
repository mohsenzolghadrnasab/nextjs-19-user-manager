'use server';

import { createUser, clearUsers } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function handleCreateUser(formData: FormData) {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();

  if (!name || !email) {
    throw new Error('نام و ایمیل اجباری هستند');
  }

  await createUser(name, email);
  revalidatePath('/users'); // رفرش صفحه /users
}

export async function handleClearUsers() {
  await clearUsers();
  revalidatePath('/users');
}