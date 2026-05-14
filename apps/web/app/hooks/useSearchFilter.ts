import { useEffect, useState } from "react";

type SearchableValue = string | number | null | undefined;

type UseSearchFilterOptions<T> = {
  initialQuery?: string;
  fields?: Array<keyof T>;
  matcher?: (item: T, normalizedQuery: string) => boolean;
};

function defaultMatcher<T extends Record<string, unknown>>(
  item: T,
  normalizedQuery: string,
  fields: Array<keyof T>,
) {
  return fields.some((field) => {
    const value = item[field] as SearchableValue;

    if (value === null || value === undefined) {
      return false;
    }

    return String(value).toLowerCase().includes(normalizedQuery);
  });
}

export function useSearchFilter<T extends Record<string, unknown>>(
  items: T[],
  options: UseSearchFilterOptions<T> = {},
) {
  const { initialQuery = "", fields = [], matcher } = options;
  const [query, setQuery] = useState(initialQuery);
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      setFilteredItems(items);
      return;
    }

    const nextItems = items.filter((item) => {
      if (matcher) {
        return matcher(item, normalizedQuery);
      }

      return defaultMatcher(item, normalizedQuery, fields);
    });

    setFilteredItems(nextItems);
  }, [fields, items, matcher, query]);

  const clearQuery = () => {
    setQuery("");
  };

  return {
    query,
    setQuery,
    clearQuery,
    filteredItems,
    hasQuery: query.trim().length > 0,
  };
}
