import { Button } from "@/ui/components/button";
import { useNavigate } from "react-router";
import paths from "../router/paths";

export const SignInMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 w-full p-8">
      <p>Sign in to save your preferences and enjoy all of the features.</p>
      <Button
        className="cursor-pointer"
        onClick={() => {
          navigate("/" + paths.auth.root);
        }}
      >
        Log In
      </Button>
    </div>
  );
};
