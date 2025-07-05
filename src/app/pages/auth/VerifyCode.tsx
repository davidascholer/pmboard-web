/**
 * This component allows users to enter a verification code sent to their email
 * for account verification or multi-factor authentication (MFA).
 * Todo:
 * - Implement the API call to verify the code
 * - Handle the response from the API to update the user state
 * - Display success or error messages based on the API response
 * - Ensure proper form handling and validation
 */

// import paths from "@/app/router/paths";
// import useAppToast from "@/shared/hooks/useAppToast";
import { useActionState } from "react";
// import { ErrorResponseType } from "@/api/util/types";
import PageContainer from "@/app/components/PageContainer";
import TokenVerificationForm from "@/app/components/auth/verification/TokenVerificationForm";
// import { resetPassword } from "@/api/controller/api";

export default function VerifyCode() {
  // Fetch auth tokens and update user state
  // const verifyCode = async (_prevState: string, formData: FormData) => {
  //   // Set an error message if the response is not ok
  //   // if (!response.ok) {
  //   //   appToast("error", (response as ErrorResponseType).data.message);
  //   //   return "state not updated";
  //   // }

  //   return "state updated";
  // };
  const verifyCode = () => "todo";

  // const appToast = useAppToast();
  const [, formAction, isPending] = useActionState(verifyCode, "initialState");

  return (
    <PageContainer>
      <TokenVerificationForm
        action={formAction}
        loading={isPending}
        headerMsg={"Enter Authentication Code Below"}
      />
    </PageContainer>
  );
}
