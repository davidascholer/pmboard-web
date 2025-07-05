import React from "react";

import PageContainer from "../components/PageContainer";
import { AppToolbar } from "../components/app-toolbar/AppToolbar";

const Home: React.FC = () => {
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);

  // if (error) {
  //   return (
  //     <PageContainer>
  //       <AppToolbar />
  //       <div className="flex justify-center">
  //         <div className="text-lg">
  //           There was a problem loading the data. Please check your internet
  //           connection and try again.
  //         </div>
  //       </div>
  //     </PageContainer>
  //   );
  // }
  return (
    <PageContainer
      // isLoading={loading}
      toolbar={<AppToolbar />}
      className="bg-[url(/bees_4k.jpg)] bg-cover bg-center w-full h-full text-bee-neutral"
    >
      <div className="w-full h-full">
        <span>hiello</span>
      </div>
    </PageContainer>
  );
};

export default Home;
