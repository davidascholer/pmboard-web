import { Button } from "@/ui/components/button";
import { Separator } from "@/ui/components/separator";
import paths from "../router/paths";
import { useNavigate } from "react-router";
import { SignInMessage } from "../components/SignInMessage";
import { useAppSelector } from "@/state/hooks";
import PageContainer from "../components/PageContainer";
import { signOut } from "../utils/utils";
import { AppToolbar } from "../components/app-toolbar/AppToolbar";

const AccountPageItem = ({
  navLink,
  children,
}: {
  navLink: string;
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <Button
            variant="link"
            onClick={() => {
              navigate(navLink);
            }}
          >
            <span className="text-base cursor-pointer">{children}</span>
          </Button>
        </div>
      </div>
      <Separator className="mx-2" />
    </>
  );
};

export default function AccountPage() {
  // const { theme, changeTheme } = useTheme();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/" + paths.home, { replace: true });
  };

  return (
    <PageContainer toolbar={<AppToolbar back/>}>
      {/* Signed In Only Items */}
      {user && user.signedIn ? (
        // Signed In Only Items
        <div className="flex flex-col items-center gap-4">
          <AccountPageItem navLink={"/" + paths.profile}>
            Profile
          </AccountPageItem>
          <AccountPageItem navLink={"/" + paths.settings}>
            Settings
          </AccountPageItem>
          <span className="w-full text-center">
            <Button onClick={handleSignOut} className="cursor-pointer">
              Sign Out
            </Button>
          </span>
        </div>
      ) : (
        <SignInMessage />
      )}
    </PageContainer>
  );
}
