import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/ui/components/pagination";
import { useSearchParams, createSearchParams } from "react-router";

interface AppPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  currentURL: string;
  className?: string;
}

const AppPagination: React.FC<AppPaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  className,
}) => {
  const [pages, setPages] = React.useState<number[]>([]);
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  const [searchParams, setSearchParams] = useSearchParams();

  React.useMemo(() => {
    const newPages = [];

    if (currentPage > lastPage) {
      setPages([]);
      return;
    }

    // If on the first 2 pages and there are more than 4 pages, add ellipsis before the last page
    if (currentPage === 1 || currentPage === 2) {
      if (lastPage > 4) setPages([1, 2, 3, -1, lastPage]);
      else {
        for (let i = 1; i <= lastPage; i++) {
          newPages.push(i);
        }
        setPages(newPages);
      }
      // If on the last two pages, add an ellipsis at the beginning
    } else if (currentPage === lastPage || currentPage === lastPage - 1) {
      setPages([1, -1, lastPage - 1, lastPage]);
      // Otherwise, display ellipsis on both sides
    } else {
      setPages([
        1,
        -1,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        -1,
        lastPage,
      ]);
    }
  }, [currentPage, lastPage]);

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSearchParams(
                  createSearchParams({
                    ...searchParams,
                    page: String(currentPage - 1),
                  })
                );
              }}
            />
          ) : (
            <PaginationPrevious className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>

        {pages.map((page, key) => (
          <React.Fragment key={key}>
            {page === -1 ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem>
                <PaginationLink
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSearchParams(
                      createSearchParams({
                        ...searchParams,
                        page: String(page),
                      })
                    );
                  }}
                  isActive={page == currentPage}
                  className={page === currentPage ? "pointer-events-none" : ""}
                  size="default"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )}
          </React.Fragment>
        ))}

        <PaginationItem>
          {currentPage < lastPage ? (
            <PaginationNext
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSearchParams(
                  createSearchParams({
                    ...searchParams,
                    page: String(currentPage + 1),
                  })
                );
              }}
            />
          ) : (
            <PaginationNext className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
