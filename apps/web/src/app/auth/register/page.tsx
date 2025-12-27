import { Metadata } from "next";
import RegisterContainer from "../_components/RegisterContainer";

export const metadata: Metadata = {
  title: "Registration | File Forge",
  description: "Create an account to start managing your files in the cloud.",
};

const RegisterPage = () => {
  return <RegisterContainer />;
};

export default RegisterPage;
