import paths from "@/app/router/paths";
import useAppToast from "@/app/utils/hooks/useAppToast";
import { useActionState, useState } from "react";
import { useNavigate } from "react-router";
import { LoginForm } from "@/app/components/auth/login-form/LoginForm";
import { useAppSelector } from "@/state/hooks";
import PageContainer from "@/app/components/PageContainer";
import { sendActivationEmail } from "@/app/api/controller/userApi";
import { userSignIn } from "@/app/api/util/util";
import { Button } from "@/ui/components/button";
import { ApiResponseType } from "@/shared/types";

export default function SignInPage() {
  const [showSendEmail, setShowSendEmail] = useState(false);
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  // Redirect to account page if user is already signed in
  if (user && user.signedIn) {
    navigate("/" + paths.account, { replace: true });
  }

  const handleSendActivationEmail = async () => {
    const sendActivationEmailResponse: ApiResponseType =
      await sendActivationEmail({
        email: formValues.email,
      });

    if (sendActivationEmailResponse.ok) {
      navigate(`/${paths.auth.root}/${paths.auth.tokenSent}`);
    } else {
      appToast("error " + JSON.stringify(sendActivationEmailResponse.error));
    }
  };

  // Fetch auth tokens and update user state
  const handleSignIn = async (_prevState: string, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setFormValues({ email, password });

    try {
      const response = await userSignIn({
        email: email,
        password: password,
      });
      // Set an error message if the response is not ok
      if (!response.ok && response.status === 400) {
        console.debug(response.error);
        appToast(
          "error " + response.error ||
            "Unable to sign in with provided credentials"
        );
        return "state not updated";
      }
      if (!response.ok && response.status === 403) {
        setShowSendEmail(true);
        return "state not updated";
      }

      return "state updated";
    } catch (error) {
      console.error("Failed to sign in", error);
      return "state not updated";
    }
  };

  const appToast = useAppToast();
  const [, formAction, isPending] = useActionState(
    handleSignIn,
    "initialState"
  );

  return (
    <PageContainer>
      <LoginForm
        formAction={formAction}
        loading={isPending}
        // icon={<Carrot />}
        formValues={formValues}
        headerMsg={"Sign In"}
        termsOfServiceUrl={`/${paths.termsOfService}`}
        privacyPolicyUrl={`/${paths.privacyPolicy}`}
        signupUrl={`/${paths.auth.root}/${paths.auth.signUp}`}
        forgotPasswordUrl={`/${paths.auth.root}/${paths.auth.forgotPassword}`}
      />
      {showSendEmail ? (
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <span className="text-sm text-center mt-4">
            Your account is inactive.
          </span>
          <Button
            className="cursor-pointer"
            onClick={handleSendActivationEmail}
          >
            Activate Your Account
          </Button>
        </div>
      ) : null}
    </PageContainer>
  );
}
