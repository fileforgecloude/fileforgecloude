"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useUrlQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQuery = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { searchParams, setQuery };
};
