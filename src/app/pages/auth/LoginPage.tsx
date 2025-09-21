/* eslint-disable @typescript-eslint/no-unused-vars */
import paths from "@/app/router/paths";
import { useActionState, useState } from "react";
import { signIn } from "@/app/lib/util";
import { LoginForm } from "@/app/components/auth/forms/LoginForm";
import AuthContainer from "./components/AuthContainer";
import { ApiResponseType } from "@/shared/types";
import userApi from "@/app/api/controller/userApi";
import useAppToast from "@/app/lib/hooks/useAppToast";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/state/hooks";
import { setLoginUserData } from "@/state/services/userSlice";
import { authApi } from "@/app/api/controller/authApi";

export default function LoginPage() {
  const appToast = useAppToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async (
    _: "state not updated" | "state updated" | undefined,
    formData: FormData
  ) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    setFormValues({ email, password });
    try {
      const response: ApiResponseType = await userApi.signIn({
        email: email,
        password: password,
      });
      if (!response.ok) {
        if (response.status === 418) {
          navigate(`/${paths.auth.root}/${paths.auth.verifyAccount}`);
          return "state updated";
        } else {
          appToast("error " + JSON.stringify(response.message));
          return "state not updated";
        }
      }

      // Todo complete login process here, e.g., store tokens, redirect, etc.
      console.log("User signed in successfully:", response);
      dispatch(setLoginUserData(response.data));
      // navigate("/" + paths.home);
      return "state updated";
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during sign in:", error);
      appToast("error Invalid email or password.");
      // Optionally return a state to indicate failure
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
