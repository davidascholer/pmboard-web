import { cn } from "@/ui/lib/utils";
import { ReactNode } from "react";

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
    role="region"
    aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
    data-testid={`board-section-${title.toLowerCase().replace(/\s+/g, "-")}`}
  >
    {/* Section header with title and add button */}
    <header
      className="flex items-center gap-4 text-sm font-bold mb-4 bg-bee-background-accent p-2 rounded-xs"
      role="banner"
    >
      <div className="flex flex-row items-center gap-1 justify-start">
        <button
          type="button"
          className="text-white hover:border-green-500 bg-green-500 focus:ring-1 hover:ring-1 focus:outline-none focus:ring-green-300 font-small rounded-2xl text-sm px-1.5 py-.5 text-center me-2 cursor-pointer"
          aria-label={`Add new item to ${title}`}
          aria-describedby={`section-${title
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          data-testid={`add-button-${title.toLowerCase().replace(/\s+/g, "-")}`}
          tabIndex={0}
        >
          +
        </button>
        <h1
          className="text-bee-light font-ubuntu-semibold text-center"
          id={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
          role="heading"
          aria-level={2}
        >
          {title}
        </h1>
      </div>
    </header>
    <div
      className="flex flex-wrap gap-2 justify-evenly min-h-[120px]"
      role="grid"
      aria-label={`${title} tickets`}
      data-testid={`tickets-container-${title
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      {children}
    </div>
  </section>
);
export default BoardSection;
