'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) {
        replace(`${pathname}?q=${encodeURIComponent(query)}`);
      } else {
        replace(pathname);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, pathname, replace]);

  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="جستجوی کاربر..."
      className="w-full p-2 border rounded mb-4"
    />
  );
}