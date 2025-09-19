import paths from "@/app/router/paths";
import { Button } from "@/ui/components/button";
import { useNavigate } from "react-router";
import AuthContainer from "./AuthContainer";

export default function TokenSentPage() {
  const navigate = useNavigate();

  return (
    <AuthContainer>
      <p className="text-center mt-8">
        An authorization code has been sent to your email address.
      </p>
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
