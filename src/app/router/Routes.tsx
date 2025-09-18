import { Routes as AppRoutes, Route } from "react-router";

import paths from "./paths";
import SignUp from "../pages/auth/SignUpPage";
import SignIn from "../pages/auth/SignInPage";
import Auth from "../pages/auth/Auth";
import NotFound from "../pages/NotFound";
import AccountPage from "../pages/AccountPage";
// import ProfilePage from "../pages/ProfilePage";
// import SettingsPage from "../pages/SettingsPage";
// import NotificationsPage from "../pages/NotifcationsPage";
import TermsOfService from "../pages/legal/TermsOfService";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import Home from "../pages/home/Home";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerifyToken from "../pages/auth/VerifyToken";
import VerifyCode from "../pages/auth/VerifyCode";
import TokenSentPage from "../pages/auth/TokenSentPage";
import Admin from "../pages/Admin";

function Routes() {
  return (
    <AppRoutes>
      {/* Route in this section have access to the navbar */}
      <Route index element={<Home />} />
      <Route path={paths.admin} element={<Admin />} />
      {/* <Route path={paths.notifications} element={<NotificationsPage />} /> */}
      <Route path={paths.account} element={<AccountPage />} />
      {/* <Route path={paths.profile} element={<ProfilePage />} /> */}
      {/* <Route path={paths.settings} element={<SettingsPage />} /> */}
      <Route path={paths.privacyPolicy} element={<PrivacyPolicy />} />
      <Route path={paths.termsOfService} element={<TermsOfService />} />
      {/* Route in this section have access to the shared auth components */}
      <Route path={paths.auth.root}>
        <Route index element={<Auth />} />
        <Route path={paths.auth.signUp} element={<SignIn />} />
        <Route path={paths.auth.signUp} element={<SignUp />} />
        <Route
          path={paths.auth.resetPassword}
          element={<ResetPasswordPage />}
        />
        <Route
          path={paths.auth.forgotPassword}
          element={<ForgotPasswordPage />}
        />
        <Route path={paths.auth.verifyToken} element={<VerifyToken />} />
        <Route path={paths.auth.tokenSent} element={<TokenSentPage />} />
      </Route>
      <Route path={paths.auth.verifyCode} element={<VerifyCode />} />
      <Route path="*" element={<NotFound />} />
    </AppRoutes>
  );
}

export default Routes;
