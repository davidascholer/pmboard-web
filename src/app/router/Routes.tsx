import { Routes as AppRoutes, Route } from "react-router";

import paths from "./paths";
import SignUp from "../pages/auth/SignUpPage";
import LoginPage from "../pages/auth/LoginPage";
import NotFound from "../pages/NotFound";
import AccountPage from "../pages/AccountPage";
// import ProfilePage from "../pages/ProfilePage";
// import SettingsPage from "../pages/SettingsPage";
// import NotificationsPage from "../pages/NotifcationsPage";
import TermsOfService from "../pages/legal/TermsOfService";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import Home from "../pages/home/Home";
import ResetPasswordPage from "../pages/auth/components/ResetPasswordContainer";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import Admin from "../pages/Admin";
import VerifyAccountPage from "../pages/auth/VerifyAccountPage";
import PromoPage from "../pages/PromoPage";

function Routes() {
  return (
    <AppRoutes>
      {/* Route in this section have access to the navbar */}
      <Route index element={<PromoPage />} />
      <Route path={paths.home} element={<Home />} />
      <Route path={paths.admin} element={<Admin />} />
      {/* <Route path={paths.notifications} element={<NotificationsPage />} /> */}
      <Route path={paths.account} element={<AccountPage />} />
      {/* <Route path={paths.profile} element={<ProfilePage />} /> */}
      {/* <Route path={paths.settings} element={<SettingsPage />} /> */}
      <Route path={paths.privacyPolicy} element={<PrivacyPolicy />} />
      <Route path={paths.termsOfService} element={<TermsOfService />} />
      {/* Route in this section have access to the shared auth components */}
      <Route path={paths.auth.root}>
        <Route index element={<LoginPage />} />
        <Route path={paths.auth.signUp} element={<SignUp />} />
        <Route
          path={paths.auth.resetPassword}
          element={<ResetPasswordPage />}
        />
        <Route
          path={paths.auth.forgotPassword}
          element={<ForgotPasswordPage />}
        />
      <Route path={paths.auth.verifyAccount} element={<VerifyAccountPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </AppRoutes>
  );
}

export default Routes;
