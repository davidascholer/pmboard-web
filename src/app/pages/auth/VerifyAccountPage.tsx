import { useActionState, useState } from "react";
import { useNavigate } from "react-router";
// import { useNavigate, useParams } from "react-router";
import paths from "@/app/router/paths";
// import { activateUser } from "@/app/api/controller/userApi";
import { Button } from "@/ui/components/button";
import AuthContainer from "./components/AuthContainer";
import useAppToast from "@/app/lib/hooks/useAppToast";
import userApi from "@/app/api/controller/userApi";
import MFACodeForm from "@/app/components/auth/forms/MFACodeForm";

export default function VerifyAccountPage() {
  const appToast = useAppToast();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    code: "",
  });

  const handleVerifyCode = async (
    _: "state not updated" | "state updated" | undefined,
    formData: FormData
  ) => {
    const code = formData.get("code") as string;
    setFormValues({ code });
    try {
      const response = await userApi.activateAccount({
        code: code,
      });
      if (!response.ok) {
        appToast("error " + JSON.stringify(response.message));
        return "state not updated";
      }

      console.log("Account verified successfully:", response);
      // Todo complete login process here, e.g., store tokens, redirect, etc.
      navigate("/");
      return "state updated";
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during sign in:", error);
      appToast("error Invalid email or password.");
      // Optionally return a state to indicate failure
      return "state not updated";
    }
  };

  const [, formAction, isPending] = useActionState(handleVerifyCode, undefined);

  return (
    <AuthContainer>
      <p className="text-center mt-8">
        An authorization code has been sent to your email address.
      </p>
      <MFACodeForm
        formValues={formValues}
        loading={isPending}
        formAction={formAction}
        buttonMsg="Activate Account"
        headerMsg={"Enter Authorization Code"}
      />
      <div className="text-center mt-8">
        <p className="text-sm">Need a new code?</p>
        <Button
          onClick={() => navigate(`/${paths.auth.root}/${paths.auth.signIn}`)}
          variant="ghost"
          className="cursor-pointer"
        >
          Login To Send A New Authorization Code
        </Button>
      </div>
    </AuthContainer>
  );
}
