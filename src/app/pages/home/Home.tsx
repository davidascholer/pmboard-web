import React, { useEffect } from "react";
import PageContainer from "../../components/PageContainer";
import { AppToolbar } from "../../components/app-toolbar/AppToolbar";
import BoardSection from "./BoardSection";
import { testTickets } from "./testData";
import Ticket from "./Ticket";
import { useAppSelector } from "@/state/hooks";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
  // Get signedIn status from context or state
  const signedIn = useAppSelector((state) => state.user.signedIn);
  const navigate = useNavigate();

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

  useEffect(() => {
    // Redirect to login if not signed in
    if (!signedIn) {
      // Navigate to login page
      navigate("/auth", { replace: true });
    }
  }, [navigate, signedIn]);

  return (
    <PageContainer
      // isLoading={loading}
      toolbar={<AppToolbar />}
      className="bg-[url(/bees_4k.jpg)] bg-fixed bg-cover bg-center w-full h-full text-bee-neutral overflow-scroll themed-scrollbar"
    >
      <main
        className="w-full flex gap-3 p-4 flex-col min-[800px]:flex-row"
        role="application"
        aria-label="Kanban board for project tickets"
        itemScope
        itemType="https://schema.org/WebPage"
        data-testid="kanban-board"
      >
        <meta itemProp="name" content="Project Management Dashboard" />
        <meta
          itemProp="description"
          content="Kanban board for managing project tickets across different stages"
        />

        <BoardSection
          title="Backlog"
          className="flex-3"
          aria-label="Backlog tickets - items waiting to be started"
        >
          {testTickets.map((ticket, index) => (
            <Ticket
              key={`${ticket.id}-${index}`}
              ticket={ticket}
              className="bg-bee-accent-light transition-color duration-200"
            />
          ))}
        </BoardSection>

        <BoardSection
          title="In Progress"
          className="flex-2"
          aria-label="In Progress tickets - items currently being worked on"
        />

        <BoardSection
          title="In Review"
          className="flex-1"
          aria-label="In Review tickets - items awaiting review or approval"
        />

        <BoardSection
          title="Complete"
          className="flex-2"
          aria-label="Complete tickets - finished items"
        />
      </main>
    </PageContainer>
  );
};

export default Home;
