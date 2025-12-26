"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import SocialAuth from "../_components/SocialAuth";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  // const error = searchParams?.get("error");

  const [loading, setLoading] = useState(false);
  return (
    <div>
      <SocialAuth setLoading={setLoading} loading={loading} callbackUrl={callbackUrl} />
    </div>
  );
};

export default LoginPage;
