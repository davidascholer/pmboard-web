import PageContainer from "@/app/components/PageContainer";
import paths from "@/app/router/paths";
import { Button } from "@/ui/components/button";
import { useNavigate } from "react-router";

export default function TokenSentPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <p className="text-center mt-8">
        An authentication link has been sent to your email address.
      </p>
      <div className="text-center mt-8">
        <p className="text-sm">Need a new link?</p>
        <Button
          onClick={() => navigate(`/${paths.auth.root}/${paths.auth.signIn}`)}
          variant="ghost"
          className="cursor-pointer"
        >
          Login To Send A New Activation Link
        </Button>
      </div>
    </PageContainer>
  );
}
