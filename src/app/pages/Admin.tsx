import React from "react";
import PageContainer from "../components/PageContainer";
import { AppToolbar } from "../components/app-toolbar/AppToolbar";
import ApiTester from "../components/ApiTester";

const Admin: React.FC = () => {
  return (
    <PageContainer
      toolbar={<AppToolbar />}
    >
      <ApiTester />
    </PageContainer>
  );
};

export default Admin;
