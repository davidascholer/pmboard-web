import useAppToast from "@/app/utils/hooks/useAppToast";
import PageContainer from "@/app/components/PageContainer";
import ResetPasswordForm from "@/app/components/auth/reset-password-form/ResetPasswordForm";
import { useNavigate } from "react-router";
import paths from "@/app/router/paths";
import { useState } from "react";
import { resetPassword } from "@/app/api/controller/userApi";
import { useAppSelector } from "@/state/hooks";
import { Button } from "@/ui/components/button";

export default function ResetPasswordPage() {
  const appToast = useAppToast();
  const { email } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [codeExpired, setCodeExpired] = useState(false);
  const [formValues, setFormValues] = useState({
    code: "",
    email: email ? email : "",
    password: "",
    passwordConfirm: "",
  });

  const handleResetPassword = async (formData: FormData) => {
    // Handle sending the MFA code to the email provided
    const authCode = formData.get("code") as string;
    const userEmail = formData.get("email") as string;
    const newUserPassword = formData.get("password") as string;
    const newUserPasswordConfirm = formData.get("passwordConfirm") as string;

    setFormValues({
      code: authCode,
      email,
      password: newUserPassword,
      passwordConfirm: newUserPasswordConfirm,
    });

    const response = await resetPassword({
      email: userEmail,
      password: newUserPassword,
      code: authCode, // MFA code sent to the email
    });

    if (!response.ok) {
      appToast("error " + response.error || "Failed to reset password.");
      if (response.error && response.error === "Key is expired.")
        setCodeExpired(true);
      return;
    }

    appToast(
      "success " +
        `Password has been successfully reset! Please sign in with your new password.`
    );
    navigate(`/${paths.auth.root}/${paths.auth.signIn}`);
    return;
  };

  return (
    <PageContainer>
      <h1>A validation code has been sent to your email address.</h1>
      {codeExpired ? (
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <span className="text-sm text-center text-red-500 mt-4">
            The code has expired.
          </span>
          <Button
            className="cursor-pointer"
            onClick={() => {
              navigate(`/${paths.auth.root}/${paths.auth.forgotPassword}`, {
                replace: true,
              });
            }}
          >
            Go Back To Create A New Code
          </Button>
        </div>
      ) : (
        <ResetPasswordForm
          formAction={handleResetPassword}
          formValues={formValues}
          headerMsg={"Reset Password"}
          className="items-center justify-center"
        />
      )}
    </PageContainer>
  );
}
