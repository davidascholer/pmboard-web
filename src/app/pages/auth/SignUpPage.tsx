/* eslint-disable @typescript-eslint/no-unused-vars */
import paths from "@/app/router/paths";
import useAppToast from "@/app/lib/hooks/useAppToast";
import { useActionState, useState } from "react";
import { useNavigate } from "react-router";
import { SignupForm } from "@/app/components/auth/signup-form/SignupForm";
import PageContainer from "@/app/components/PageContainer";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // if (user && user.signedIn) {
  //   navigate("/" + paths.account, { replace: true });
  // }

  const signUp = async (_: void, formData: FormData) => {
    // const email = formData.get("email") as string;
    // const password = formData.get("password") as string;
    // const passwordConfirm = formData.get("passwordConfirm") as string;

    // setFormValues({ email, password, passwordConfirm });

    // if (password !== passwordConfirm) {
    //   appToast("error passwords do not match");
    //   return "state not updated";
    // }

    // try {
    //   const response = await createUserAccount({
    //     email: email,
    //     password: password,
    //     passwordConfirm: passwordConfirm,
    //   });
    //   if (!response.ok) {
    //     appToast("error "+ JSON.stringify(response.error));
    //     return "state not updated";
    //   }
    //   navigate(`/${paths.auth.root}/${paths.auth.tokenSent}`);

    //   return "state updated";
    // } catch (error) {
    //   // Handle unexpected errors
    //   console.error("Error during user creation:", error);
    //   appToast("error A user with this email already exists.");
    //   // Optionally return a state to indicate failure
    //   return "state not updated";
    // }
  };

  // const appToast = useAppToast();
  const [, formAction, isPending] = useActionState(signUp, undefined);

  return (
    <PageContainer>
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
    </PageContainer>
  );
}
