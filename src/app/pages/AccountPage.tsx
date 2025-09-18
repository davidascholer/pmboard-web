import { Button } from "@/ui/components/button";
import paths from "../router/paths";
import { useNavigate } from "react-router";
import { SignInMessage } from "../components/SignInMessage";
import PageContainer from "../components/PageContainer";
import { signOut } from "../lib/util";
import { AppToolbar } from "../components/app-toolbar/AppToolbar";
import { useState } from "react";
// import AppContext from "@/context/AppContext";

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
      <div className="flex justify-center items-center w-full">
        <Button
          variant="secondary"
          onClick={() => {
            navigate(navLink);
          }}
          className="bg-bee-background-accent max-w-2xl rounded-xl p-8 w-full cursor-pointer hover-highlight flex justify-center items-center"
        >
          <span className="text-white shadow-white shadow-2xl cursor-pointer">{children}</span>
        </Button>
      </div>
      {/* <Separator className="mx-2" /> */}
    </>
  );
};

export default function AccountPage() {
  // const { theme, changeTheme } = useContext(AppContext);
  const [user] = useState({
    signedIn: true,
    email: "user@example.com",
  });
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/" + paths.home, { replace: true });
  };

  return (
    <PageContainer
      // isLoading={loading}
      toolbar={<AppToolbar account={false} back />}
      className="bg-[url(/bees_4k.jpg)] bg-cover bg-center w-full h-full text-bee-neutral"
    >
      {/* Signed In Only Items */}
      {user && user.signedIn ? (
        // Signed In Only Items
        <div className="flex flex-col items-center gap-4 p-6 mt-6">
          <AccountPageItem navLink={"/" + paths.profile}>
            Profile
          </AccountPageItem>
          <AccountPageItem navLink={"/" + paths.settings}>
            Settings
          </AccountPageItem>
          <div className="w-full text-center">
            <Button
              onClick={handleSignOut}
              className="bg-bee-background-accent max-w-2xl rounded-xl p-8 w-full cursor-pointer hover-highlight flex justify-center items-center mx-auto"
              variant="secondary"
            >
              <span className="text-white shadow-white shadow-2xl cursor-pointer">
                Sign out
              </span>
            </Button>
          </div>
        </div>
      ) : (
        <SignInMessage />
      )}
    </PageContainer>
  );
}
