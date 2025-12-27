import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export const metadata = {
  title: "File Forge",
  description: "The ultimate cloud storage forge for creative professionals and modern teams. Secure, fast, and free to start.",
};

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
};

export default LandingPage;
