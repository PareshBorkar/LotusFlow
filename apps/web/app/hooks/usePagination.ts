import { useEffect, useState } from "react";

type UsePaginationOptions = {
  initialPage?: number;
  pageSize?: number;
};

export function usePagination<T>(
  items: T[],
  options: UsePaginationOptions = {},
) {
  const { initialPage = 1, pageSize = 6 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = items.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    const safePage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(safePage);
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const previousPage = () => {
    goToPage(currentPage - 1);
  };

  return {
    currentPage,
    totalPages,
    pageSize,
    paginatedItems,
    goToPage,
    nextPage,
    previousPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
