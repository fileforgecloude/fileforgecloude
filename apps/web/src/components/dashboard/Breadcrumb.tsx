"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import React from "react";

export function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav className='flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400'>
      <Link href='/dashboard' className='flex items-center hover:text-neutral-900 dark:hover:text-white transition-colors'>
        <Home className='w-4 h-4 mr-1' />
        <span>Dashboard</span>
      </Link>

      {pathSegments.slice(1).map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 2).join("/")}`;
        const isLast = index === pathSegments.length - 2;

        return (
          <React.Fragment key={href}>
            <ChevronRight className='w-4 h-4' />
            {isLast ? (
              <span className='font-medium text-neutral-900 dark:text-white capitalize'>{segment.replace(/-/g, " ")}</span>
            ) : (
              <Link href={href} className='hover:text-neutral-900 dark:hover:text-white transition-colors capitalize'>
                {segment.replace(/-/g, " ")}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
