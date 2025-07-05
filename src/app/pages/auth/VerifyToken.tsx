import { useEffect, useState } from "react";
import PageContainer from "@/app/components/PageContainer";
import { useNavigate, useParams } from "react-router";
import paths from "@/app/router/paths";
import { activateUser } from "@/app/api/controller/userApi";
import { Button } from "@/ui/components/button";

export default function VerifyToken() {
  // Get the token from the URL params
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying token...");
  const [verifySuccess, SetVerifySuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If no token is provided, show an error
    if (!token) {
      setMessage("No token provided for verification.");
    } else {
      const activateUserAccount = async () => {
        // Call the API to verify the token
        const response = await activateUser({ token });

        // Handle the response
        if (response.ok) {
          setMessage("Token verified successfully!");
          SetVerifySuccess(true);
        } else {
          // Handle error response
          setMessage("Token invalid or expired.");
        }
      };
      activateUserAccount();
    }
  }, [token]);

  return (
    <PageContainer>
      <p className="text-center text-lg mt-4">{message}</p>
      {verifySuccess ? (
        <Button
          onClick={() => navigate(`/${paths.auth.root}/${paths.auth.signIn}`)}
          variant="ghost"
          className="cursor-pointer mt-4 text-lg"
        >
          You May Now Login To Your Account
        </Button>
      ) : (
        <Button
          onClick={() => navigate(`/${paths.auth.root}/${paths.auth.signIn}`)}
          variant="ghost"
          className="cursor-pointer mt-4 text-lg"
        >
          Login To Your Account To Request A New Token
        </Button>
      )}
    </PageContainer>
  );
}
