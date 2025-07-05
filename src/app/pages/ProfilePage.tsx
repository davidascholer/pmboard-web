import PageContainer from "../components/PageContainer";
import { useAppSelector } from "@/state/hooks";
import { SignInMessage } from "../components/SignInMessage";
import { Button } from "@/ui/components/button";
import { useNavigate } from "react-router";
import paths from "../router/paths";
import { signOut } from "../utils/utils";
import { sendMFACodeEmail } from "../api/controller/userApi";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/" + paths.home, { replace: true });
  };

  return (
    <PageContainer>
      <div className="flex flex-col justify-center items-center text-lg w-full p-6">
        {/* Signed In Only Items */}
        {user && user.signedIn ? (
          <div className="flex flex-col w-full gap-8 max-w-72">
            <div className="flex justify-between w-full">
              <div>Email</div>
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex justify-between w-full">
              <div>Password</div>
              <Button
                variant="link"
                className="cursor-pointer p-0"
                onClick={() => {
                  // Call the API to send the MFA code to the email
                  sendMFACodeEmail({
                    email: user.email,
                  });
                  navigate(`/${paths.auth.root}/${paths.auth.resetPassword}`);
                }}
              >
                Change Password
              </Button>
            </div>
            {/* <div className="flex justify-between w-full">
              <div>First Name</div>
              <div>{user.first_name}</div>
            </div>
            <div className="flex justify-between w-full">
              <div>Last Name</div>
              <div>{user.last_name}</div>
            </div> */}
            {/* <div className="flex justify-between w-full">
                      <div>Phone Number</div>
                      <div>{user.phone}</div>
                    </div>
                    <div className="flex justify-between w-full">
                      <div>Address</div>
                      <div>{user.address}</div>
                    </div> */}
            {/* <div className="flex justify-between w-full">
              <div>Profile Image</div>
              <Button
                variant="link"
                className="cursor-pointer p-0"
                onClick={() => console.debug("Todo: change profile image")}
              >
                Change Profile Image
              </Button>
            </div> */}
            <span className="w-full text-center">
              <Button onClick={handleSignOut} className="cursor-pointer">
                Sign Out
              </Button>
            </span>
          </div>
        ) : (
          <SignInMessage />
        )}
      </div>
    </PageContainer>
  );
}
