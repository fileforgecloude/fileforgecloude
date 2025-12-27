import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import { ReactNode } from "react";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className='min-h-screen'> {children}</main>
      <Footer />
    </>
  );
};

export default LandingLayout;
