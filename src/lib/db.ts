// شبیه‌سازی یک دیتابیس در حافظه (فقط برای دمو)
let users: { id: string; name: string; email: string }[] = [
  { id: '1', name: 'علی رضایی', email: 'ali@example.com' },
  { id: '2', name: 'سارا محمدی', email: 'sara@example.com' },
];

let nextId = 3;

export async function getUsers() {
  // شبیه‌سازی تأخیر شبکه
  await new Promise(resolve => setTimeout(resolve, 800));
  return users;
}

export async function createUser(name: string, email: string) {
  const newUser = { id: String(nextId++), name, email };
  users.push(newUser);
  // شبیه‌سازی ذخیره‌سازی
  await new Promise(resolve => setTimeout(resolve, 300));
  return newUser;
}

export async function clearUsers() {
  users = [];
  nextId = 1;
}