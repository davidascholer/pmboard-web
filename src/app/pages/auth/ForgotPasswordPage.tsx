import useAppToast from "@/app/utils/hooks/useAppToast";
import { useNavigate } from "react-router";
import PageContainer from "@/app/components/PageContainer";
import ForgotPasswordForm from "@/app/components/auth/reset-password-form/ForgotPasswordForm";
import paths from "@/app/router/paths";
import { sendMFACodeEmail } from "@/app/api/controller/userApi";

export default function ForgotPasswordPage() {
  const appToast = useAppToast();
  const navigate = useNavigate();

  const handleEmailCode = (formData: FormData) => {
    // Handle sending the MFA code to the email provided
    const userEmail = formData.get("email") as string;
    if (!userEmail) {
      appToast("error Email is required.");
      return;
    }

    // Call the API to send the MFA code to the email
    sendMFACodeEmail({
      email: userEmail,
    });

    appToast(
      "none " +`Reset password email sent to ${userEmail}! Please check your inbox.`
    );

    navigate(`/${paths.auth.root}/${paths.auth.resetPassword}`);
    return;
  };

  return (
    <PageContainer>
      <ForgotPasswordForm
        formAction={handleEmailCode}
        headerMsg={"Forgot Password"}
        className=" h-[80vh] items-center justify-center"
      />
    </PageContainer>
  );
}
