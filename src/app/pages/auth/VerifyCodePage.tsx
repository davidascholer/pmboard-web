/**
 * This component allows users to enter a verification code sent to their email
 * for account verification or multi-factor authentication (MFA).
 */

import { useActionState, useState } from "react";
import PageContainer from "@/app/components/PageContainer";
import useAppToast from "@/app/lib/hooks/useAppToast";
import { useNavigate } from "react-router";
import userApi from "@/app/api/controller/userApi";
import MFACodeForm from "@/app/components/auth/forms/MFACodeForm";

export default function VerifyCodePage() {
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
    <PageContainer>
      <MFACodeForm
        formValues={formValues}
        loading={isPending}
        formAction={formAction}
        headerMsg={""}
      />
    </PageContainer>
  );
}
