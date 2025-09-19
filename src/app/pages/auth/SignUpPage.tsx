import paths from "@/app/router/paths";
import useAppToast from "@/app/lib/hooks/useAppToast";
import { useActionState, useState } from "react";
import { useNavigate } from "react-router";
import { SignupForm } from "@/app/components/auth/forms/SignupForm";
import AuthContainer from "./components/AuthContainer";
import userApi from "@/app/api/controller/userApi";
import { ApiResponseType } from "@/shared/types";

export default function SignUpPage() {
  const navigate = useNavigate();
  const appToast = useAppToast();
  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSignUp = async (
    _: "state not updated" | "state updated" | undefined,
    formData: FormData
  ) => {
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;
    setFormValues({ email, username, password, passwordConfirm });
    if (password !== passwordConfirm) {
      appToast("error passwords do not match");
      return "state not updated";
    }
    try {
      const response: ApiResponseType = await userApi.signUp({
        email: email,
        name: username,
        password: password,
        passwordConfirm: passwordConfirm,
      });
      if (!response.ok) {
        appToast("error " + JSON.stringify(response.message));
        return "state not updated";
      }
      navigate(`/${paths.auth.root}/${paths.auth.verifyAccount}`);
      return "state updated";
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during user creation:", error);
      appToast("error A user with this email already exists.");
      // Optionally return a state to indicate failure
      return "state not updated";
    }
  };

  const [, formAction, isPending] = useActionState(handleSignUp, undefined);

  return (
    <AuthContainer>
      <SignupForm
        formAction={formAction}
        loading={isPending}
        // icon={<Carrot />}
        formValues={formValues}
        headerMsg={"Sign Up"}
        termsOfServiceUrl={`/${paths.termsOfService}`}
        privacyPolicyUrl={`/${paths.privacyPolicy}`}
        loginUrl={`/${paths.auth.root}`}
      />
    </AuthContainer>
  );
}
