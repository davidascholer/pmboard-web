/* eslint-disable @typescript-eslint/no-unused-vars */
import paths from "@/app/router/paths";
import { useActionState, useEffect, useState } from "react";
import { signIn } from "@/app/lib/util";
import { LoginForm } from "@/app/components/auth/forms/LoginForm";
import AuthContainer from "./components/AuthContainer";
import { ApiResponseType } from "@/shared/types";
import useAppToast from "@/app/lib/hooks/useAppToast";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setLoginUserData } from "@/state/services/userSlice";
import { authApi } from "@/app/api/controller/authApi";

export default function LoginPage() {
  const appToast = useAppToast();
  const navigate = useNavigate();
  const signedIn = useAppSelector((state) => state.user.signedIn);
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Redirect to login if not signed in
    if (signedIn) {
      // Attempt to sign in with existing cookie token
      authApi.refreshToken().then((res) => {
        console.log("refresh token res", res);
      });
      // Navigate to main page
      navigate("/" + paths.home, { replace: true });
    }
  }, [navigate, signedIn]);

  const handleSignIn = async (
    _: "state not updated" | "state updated" | undefined,
    formData: FormData
  ) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    setFormValues({ email, password });
    try {
      const responseStatus = await signIn({ email, password });
      if (responseStatus === 200) {
        appToast("Logged in successfully!");
        navigate("/" + paths.home, { replace: true });
        return "state updated";
      } else if (responseStatus === 418) {
        appToast("Your account is inactive.");
        navigate(`/${paths.auth.root}/${paths.auth.verifyAccount}`);
      } else {
        appToast("Invalid email or password.");
      }
      return "state not updated";
    } catch (error) {
      console.error("Error during sign in:", error);
      appToast("Unable to log in.");
      return "state not updated";
    }
  };

  const [, formAction, isPending] = useActionState(handleSignIn, undefined);

  return (
    <AuthContainer>
      <LoginForm
        formAction={formAction}
        loading={isPending}
        // icon={<Carrot />}
        formValues={formValues}
        headerMsg={"Log In"}
        termsOfServiceUrl={`/${paths.termsOfService}`}
        privacyPolicyUrl={`/${paths.privacyPolicy}`}
        signupUrl={`/${paths.auth.root}/${paths.auth.signUp}`}
        forgotPasswordUrl={`/${paths.auth.root}/${paths.auth.forgotPassword}`}
      />
      {/* <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <span className="text-sm text-center mt-4">
            Your account is inactive.
            <br />
            An activation email has been sent to your inbox.
          </span>
        </div> */}
      <button
        onClick={() => {
          authApi.refreshToken().then((res) => {
            console.log("refresh token res", res);
          });
        }}
      >
        test refresh token endpoint
      </button>
    </AuthContainer>
  );
}
