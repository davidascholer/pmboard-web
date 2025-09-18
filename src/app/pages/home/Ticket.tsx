import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/components/card";
import { cn } from "@/ui/lib/utils";
import { LucideX } from "lucide-react";
import { useState } from "react";

export type TicketType = {
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

const Ticket = ({
  ticket,
  className,
}: {
  ticket: TicketType;
  className?: string;
}) => {
  const [cardSelected, setCardSelected] = useState(false);
  const ticketId = `ticket-${ticket.id}-${ticket.title
    .toLowerCase()
    .replace(/\s+/g, "-")}`;
  const modalId = `modal-${ticketId}`;

  return (
    <>
      <article
        className={cn(
          "w-[120px] aspect-square bg-bee-accent-light p-2 rounded-xs text-xs cursor-pointer flex flex-col justify-between",
          className
        )}
        onClick={() => setCardSelected(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setCardSelected(true);
          }
        }}
        role="gridcell"
        tabIndex={0}
        aria-label={`Ticket: ${ticket.title}, Priority: ${ticket.priority}`}
        aria-describedby={`${ticketId}-description`}
        aria-expanded={cardSelected}
        aria-controls={cardSelected ? modalId : undefined}
        data-testid={`ticket-card-${ticket.id}`}
        itemScope
        itemType="https://schema.org/Task"
      >
        <h2
          className="text-xs font-semibold font-quicksand"
          role="heading"
          aria-level={3}
          itemProp="name"
        >
          {ticket.title}
        </h2>
        {/* <h2 className="text-xs line-clamp-2 mt-2">{ticket.description}</h2> */}
        <span
          className="text-xs"
          aria-label={`Priority level: ${ticket.priority}`}
          itemProp="priority"
          data-testid={`ticket-priority-${ticket.id}`}
        >
          {ticket.priority}
        </span>
      </article>
      {cardSelected ? (
        <div
          className="w-screen h-screen fixed left-0 top-0 right-0 bottom-0 bg-black/75 z-50 flex items-center justify-center"
          onClick={() => setCardSelected(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${modalId}-title`}
          aria-describedby={`${modalId}-content`}
          data-testid={`ticket-modal-${ticket.id}`}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setCardSelected(false);
            }
          }}
        >
          <Card
            className={cn(
              "w-3/4 min-w-[300px] max-w-[600px] aspect-square bg-bee-accent-light p-2 rounded-xs text-lg",
              className
            )}
            onClick={(e) => e.stopPropagation()}
            role="document"
            aria-labelledby={`${modalId}-title`}
            itemScope
            itemType="https://schema.org/Task"
          >
            <CardHeader className="p-0">
              <CardTitle
                id={`${modalId}-title`}
                role="heading"
                aria-level={1}
                itemProp="name"
              >
                {ticket.title}
              </CardTitle>
              {/* {ticket.feature?.title && (
                <CardDescription>{ticket.feature.title}</CardDescription>
              )} */}
              {ticket.description && (
                <CardDescription
                  className="text-lg mt-4"
                  id={`${modalId}-content`}
                  role="region"
                  aria-label="Ticket description"
                  itemProp="description"
                >
                  {ticket.description.map((desc, index) => (
                    <p
                      key={index}
                      className="text-lg"
                      role="listitem"
                      aria-label={`Description item ${index + 1}`}
                    >
                      {desc}
                    </p>
                  ))}
                </CardDescription>
              )}

              <CardAction
                onClick={() => setCardSelected(false)}
                className="cursor-pointer"
                role="button"
                aria-label="Close ticket details"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setCardSelected(false);
                  }
                }}
                data-testid={`close-modal-${ticket.id}`}
              >
                <LucideX
                  className="w-8 h-8 text-bee-neutral"
                  aria-hidden="true"
                />
              </CardAction>
            </CardHeader>
            <CardContent role="region" aria-label="Ticket details">
              {ticket.timeEstimateMin && (
                <p
                  itemProp="estimatedDuration"
                  aria-label={`Estimated time: ${Math.ceil(
                    ticket.timeEstimateMin / 60
                  )} hours`}
                >
                  Estimated time: {Math.ceil(ticket.timeEstimateMin / 60)} hours
                </p>
              )}
            </CardContent>
            <CardFooter
              className="mt-auto"
              role="contentinfo"
              aria-label="Ticket metadata"
            >
              {/* <p>Status: {ticket.status}</p> */}
              <p
                itemProp="priority"
                aria-label={`Priority level: ${ticket.priority}`}
              >
                Priority: {ticket.priority}
              </p>
            </CardFooter>
          </Card>
        </div>
      ) : null}
    </>
  );
};
export default Ticket;
