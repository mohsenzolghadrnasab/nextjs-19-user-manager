export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">مدیریت کاربران</h1>
      <p className="mb-6 text-gray-600">
        یک دموی کامل با React 19 و Next.js 15.5
      </p>
      <a
        href="/users"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        مشاهده کاربران
      </a>
    </div>
  );
}