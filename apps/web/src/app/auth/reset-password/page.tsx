import { Metadata } from "next";
import ResetPasswordContainer from "../_components/ResetPasswordContainer";

export const metadata: Metadata = {
  title: "Reset Password | File Forge",
  description: "Set a new password for your File Forge account.",
};

const ResetPasswordPage = () => {
  return <ResetPasswordContainer />;
};

export default ResetPasswordPage;
