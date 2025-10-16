'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ total, perPage }: { total: number; perPage: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(total / perPage);

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => replace(createPageURL(page))}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}