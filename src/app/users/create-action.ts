'use server';

import { createUser } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// ✅ تابع باید دو پارامتر داشته باشد: prevState و formData
export async function handleCreateUser(
  prevState: { message?: string } | null,
  formData: FormData
) {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();

  if (!name || !email) {
    return { message: 'نام و ایمیل اجباری هستند' };
  }

  try {
    await createUser(name, email);
    revalidatePath('/users');
    return { message: 'کاربر با موفقیت ایجاد شد!' };
  } catch (error) {
    return { message: 'خطا در ایجاد کاربر: ' + (error as Error).message };
  }
}

export async function handleClearUsers() {
  // این تابع مستقل است و با useFormState استفاده نمی‌شود
  await (await import('@/lib/db')).clearUsers();
  revalidatePath('/users');
}