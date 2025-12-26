import { ReactNode } from "react";

const BlogsLayout = ({ children }: { children: ReactNode }) => {
  return <main className='bg-gray-50 dark:bg-[#0b0700]'>{children}</main>;
};

export default BlogsLayout;
