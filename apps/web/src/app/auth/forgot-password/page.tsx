import { Metadata } from "next";
import ForgotPasswordContainer from "../_components/ForgotPasswordContainer";

export const metadata: Metadata = {
  title: "Forgot Password | File Forge",
  description: "Request a password reset link for your File Forge account.",
};

const ForgotPasswordPage = () => {
  return <ForgotPasswordContainer />;
};

export default ForgotPasswordPage;
