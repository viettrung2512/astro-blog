import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginForm from "./LoginForm";

const GoogleProviderWrapper = () => {
  return (
    <GoogleOAuthProvider clientId="676959420577-hjks9prgmq21oouea14iqf3heej9k0ic.apps.googleusercontent.com">
      <LoginForm />
    </GoogleOAuthProvider>
  );
};

export default GoogleProviderWrapper;
