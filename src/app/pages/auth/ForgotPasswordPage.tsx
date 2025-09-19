import useAppToast from "@/app/lib/hooks/useAppToast";
import { useNavigate } from "react-router";
import ForgotPasswordForm from "@/app/components/auth/forms/ForgotPasswordForm";
import paths from "@/app/router/paths";
import AuthContainer from "./components/AuthContainer";
// import { sendMFACodeEmail } from "@/app/api/controller/userApi";

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
    // sendMFACodeEmail({
    //   email: userEmail,
    // });

    appToast(
      "none " +`Reset password email sent to ${userEmail}! Please check your inbox.`
    );

    navigate(`/${paths.auth.root}/${paths.auth.resetPassword}`);
    return;
  };

  return (
    <AuthContainer>
      <ForgotPasswordForm
        formAction={handleEmailCode}
        headerMsg={"Forgot Password"}
      />
    </AuthContainer>
  );
}
