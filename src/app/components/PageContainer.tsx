import React from "react";
import { cn } from "@/ui/lib/utils";
import useForceDelay from "../utils/hooks/useForceDelay";
import ErrorBoundary from "./ErrorBoundary";
import LoadingWithChildren from "./LoadingWithChildren";

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
      <>
        <LoadingWithChildren>{toolbar}</LoadingWithChildren>
      </>
    );
  }

  return (
    <>
      {toolbar}

      <div
        className={cn(
          "flex flex-col items-center w-full h-full p-1",
          className
        )}
      >
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
    </>
  );
};

export default PageContainer;
