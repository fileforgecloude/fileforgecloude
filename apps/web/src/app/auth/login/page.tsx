import { Metadata } from "next";
import LoginContainer from "../_components/LoginContainer";

export const metadata: Metadata = {
  title: "Welcome to File Forge",
  description: "Login to your account",
};

const LoginPage = () => {
  return (
    <div>
      <LoginContainer />
    </div>
  );
};

export default LoginPage;
