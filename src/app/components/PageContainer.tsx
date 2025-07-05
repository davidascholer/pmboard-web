import React from "react";
import useForceDelay from "../utils/hooks/useForceDelay";
import ErrorBoundary from "./ErrorBoundary";
import LoadingWithChildren from "./LoadingWithChildren";
import { cn } from "@/ui/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  toolbar?: React.ReactNode;
  disableAutoLoading?: boolean;
  className?: string;
  isLoading?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  toolbar,
  disableAutoLoading = false,
  className,
  isLoading = false,
}) => {
  const loading = useForceDelay();

  if ((loading || isLoading) && !disableAutoLoading) {
    return (
      <div className="w-screen h-screen flex flex-col pt-16">
        <LoadingWithChildren>{toolbar}</LoadingWithChildren>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col pt-16", className)}>
      {toolbar}
      <div className={"w-screen h-screen flex flex-col"}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    </div>
  );
};

export default PageContainer;
