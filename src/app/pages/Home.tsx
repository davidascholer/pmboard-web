import React, { ReactNode } from "react";
import PageContainer from "../components/PageContainer";
import { AppToolbar } from "../components/app-toolbar/AppToolbar";
import { cn } from "@/ui/lib/utils";
import {
  Card,
  CardHeader,
  CardAction,
  CardDescription,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/ui/components/card";
import { LucideX } from "lucide-react";

const testTickets: TicketType[] = [
  {
    title: "Configure system architecture",
    description: [
      "- Set up services in AWS",
      "- Point dns to new architecture",
      "- Deploy current project to new architecture",
    ],
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    section: "ACTIVE",
    status: "UNASSIGNED",
    priority: "URGENT",
    timeEstimateMin: 600,
    projectId: "project-1",
    feature: { title: "Front end refactor", id: 1 },
    assignees: [],
  },
  {
    title: "Create authentication system",
    description: [
      "- Decide on authentication architecture (microservice or coded in)",
      "- Set up microservice or code authentication system in backend and sql (set up sql database)",
      "- Implement UI for login and registration",
      "- Time frame is an ballpark, but I don't expect it to take more than a long day's work",
    ],
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    section: "ACTIVE",
    status: "UNASSIGNED",
    priority: "HIGH",
    timeEstimateMin: 480,
    projectId: "project-1",
    feature: { title: "Front end refactor", id: 1 },
    assignees: [],
  },
  {
    title: "Implement project database",
    description: [
      "- Partition project database",
      "- Migrate all current data to tables",
      "- Implement software architecture change to code",
      "- We will undboutably need this pretty quickly",
    ],
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    section: "ACTIVE",
    status: "UNASSIGNED",
    priority: "HIGH",
    timeEstimateMin: 180,
    projectId: "project-1",
    feature: { title: "Front end refactor", id: 1 },
    assignees: [],
  },
  {
    title: "Front end refactor",
    description: [
      "- Remove environment config files and add to .gitignore",
      "- Upgrade create-react-app (react-scripts) to vite",
      "- Upgrade typescript to latest version",
    ],
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    section: "ACTIVE",
    status: "UNASSIGNED",
    priority: "LOW",
    timeEstimateMin: 180,
    projectId: "project-1",
    feature: { title: "Front end refactor", id: 1 },
    assignees: [],
  },
  {
    title: "Scraping tools",
    description: [
      "- Set up cron job for exisiting scraping tools (I'm thinking AWS Lambda but we can discuss)",
      "- Build scraping tools for the other sites",
      "- Time frame on this is iffy. It depends on the complexity of the sites and how much data we need to scrape",
      "- AI says to expect this to take a few days to a week, but I believe it will be quicker",
    ],
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    section: "ACTIVE",
    status: "UNASSIGNED",
    priority: "HIGH",
    timeEstimateMin: 720,
    projectId: "project-1",
    feature: { title: "Front end refactor", id: 1 },
    assignees: [],
  },
  {
    title: "AWS Lex Chatbot",
    description: [
      "- Create a custom AI chatbot using AWS Lex",
      "- Train LLM to only accept predetermined data",
      "- Time frame on this is unknown. After I take the course, I will have a better idea of how long this will take",
    ],
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    section: "ACTIVE",
    status: "UNASSIGNED",
    priority: "MODERATE",
    timeEstimateMin: 600,
    projectId: "project-1",
    feature: { title: "Front end refactor", id: 1 },
    assignees: [],
  },
  {
    title: "Setup version control in project",
    description: ["- Set up versioning for scale"],
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    section: "ACTIVE",
    status: "UNASSIGNED",
    priority: "MODERATE",
    timeEstimateMin: 120,
    projectId: "project-1",
    feature: { title: "Front end refactor", id: 1 },
    assignees: [],
  },
];

type TicketType = {
  id: string;
  title: string;
  description?: string[];
  createdAt: Date;
  updatedAt: Date;
  section: "ACTIVE" | "IN_PROGRESS" | "IN_REVIEW" | "COMPLETE";
  status: "UNASSIGNED" | "ASSIGNED";
  priority: "LOW" | "MODERATE" | "HIGH" | "URGENT";
  timeEstimateMin?: number;
  projectId: string;
  feature: { title: string; id: number };
  assignees: unknown[];
};

const BoardSection = ({
  title,
  className,
  children,
}: {
  title: string;
  className: string;
  children?: ReactNode;
}) => (
  <section
    className={cn(
      "flex flex-col h-auto bg-bee-background p-4 rounded-xs",
      className
    )}
  >
    {/* Section header with title and add button */}
    <h1 className="flex items-center gap-4 text-sm font-bold mb-4 bg-bee-background-accent p-2 rounded-xs">
      <div className="flex flex-row items-center gap-1 justify-start">
        <button
          type="button"
          className="text-white hover:border-green-500 bg-green-500 focus:ring-1 hover:ring-1 focus:outline-none focus:ring-green-300 font-small rounded-2xl text-sm px-1.5 py-.5 text-center me-2 cursor-pointer"
        >
          +
        </button>
        <span className="text-bee-light font-ubuntu-semibold">{title}</span>
      </div>
    </h1>
    <div className="flex flex-wrap gap-2 justify-evenly min-h-[120px]">
      {children}
    </div>
  </section>
);

const Ticket = ({
  ticket,
  className,
}: {
  ticket: TicketType;
  className?: string;
}) => {
  const [cardSelected, setCardSelected] = React.useState(false);
  return (
    <>
      <div
        className={cn(
          "w-[120px] aspect-square bg-bee-accent-light p-2 rounded-xs text-xs cursor-pointer flex flex-col justify-between",
          className
        )}
        onClick={() => setCardSelected(true)}
      >
        <h2 className="text-xs font-semibold font-quicksand">{ticket.title}</h2>
        {/* <h2 className="text-xs line-clamp-2 mt-2">{ticket.description}</h2> */}
        <h2 className="text-xs">{ticket.priority}</h2>
      </div>
      {cardSelected ? (
        <div
          className="w-screen h-screen fixed left-0 top-0 right-0 bottom-0 bg-black/75 z-50 flex items-center justify-center"
          onClick={() => setCardSelected(false)}
        >
          <Card
            className={cn(
              "w-3/4 min-w-[300px] max-w-[600px] aspect-square bg-bee-accent-light p-2 rounded-xs text-lg",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="p-0">
              <CardTitle>{ticket.title}</CardTitle>
              {/* {ticket.feature?.title && (
                <CardDescription>{ticket.feature.title}</CardDescription>
              )} */}
              {ticket.description && (
                <CardDescription className="text-lg mt-4">
                  {ticket.description.map((desc, index) => (
                    <p key={index} className="text-lg">
                      {desc}
                    </p>
                  ))}
                </CardDescription>
              )}

              <CardAction
                onClick={() => setCardSelected(false)}
                className="cursor-pointer"
              >
                <LucideX className="w-8 h-8 text-bee-neutral" />
              </CardAction>
            </CardHeader>
            <CardContent>
              {ticket.timeEstimateMin && (
                <p>
                  Estimated time: {Math.ceil(ticket.timeEstimateMin / 60)} hours
                </p>
              )}
            </CardContent>
            <CardFooter className="mt-auto">
              {/* <p>Status: {ticket.status}</p> */}
              <p>Priority: {ticket.priority}</p>
            </CardFooter>
          </Card>
        </div>
      ) : null}
    </>
  );
};

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
      className="bg-[url(/bees_4k.jpg)] bg-cover bg-center w-full h-full text-bee-neutral scroll-auto"
    >
      <div className="w-full flex gap-3 p-4 flex-col min-[800px]:flex-row">
        <BoardSection title="Backlog" className="flex-3">
          {testTickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              ticket={ticket}
              className="bg-bee-accent-light  transition-color duration-200"
            ></Ticket>
          ))}
        </BoardSection>
        <BoardSection title="In Progress" className="flex-2"></BoardSection>
        <BoardSection title="In Review" className="flex-1"></BoardSection>
        <BoardSection title="Complete" className="flex-2"></BoardSection>
      </div>
    </PageContainer>
  );
};

export default Home;
