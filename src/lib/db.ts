// lib/db.ts

// 1. تعریف نوع User
type User = {
  id: string;
  name: string;
  email: string;
};

// 2. تعریف داده‌های نمونه
const users: User[] = [
  { id: '1', name: 'علی رضایی', email: 'ali@example.com' },
  { id: '2', name: 'سارا محمدی', email: 'sara@example.com' },
  { id: '3', name: 'رضا احمدی', email: 'reza@example.com' },
  { id: '4', name: 'نازنین کاظمی', email: 'nazanin@example.com' },
];

// 3. تابع getUsers با نوع‌گذاری کامل
export async function getUsers(page: number = 1, perPage: number = 5, query: string = '') {
  await new Promise(r => setTimeout(r, 500)); // شبیه‌سازی تأخیر

  let filtered: User[] = users;

  if (query) {
    filtered = users.filter((u: User) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    );
  }

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return {
    users: paginated,
    total: filtered.length,
    page,
    perPage,
  };
}

// 4. سایر توابع (ایجاد، ویرایش، حذف) — به‌صورت شبیه‌سازی
let nextId = 5;

export async function createUser(name: string, email: string): Promise<User> {
  await new Promise(r => setTimeout(r, 200));
  const newUser: User = { id: String(nextId++), name, email };
  users.push(newUser);
  return newUser;
}

export async function updateUser(id: string, name: string, email: string): Promise<User | null> {
  await new Promise(r => setTimeout(r, 200));
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { id, name, email };
    return users[index];
  }
  return null;
}

export async function deleteUser(id: string): Promise<void> {
  await new Promise(r => setTimeout(r, 200));
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
}