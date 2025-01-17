"use client";

import { ReactElement, useContext, useMemo } from "react";

import { FiltersType } from "@/types/filters.type";

import { FiltersContext } from "@/app/search/providers/filters/filters.provider";

import styles from "./filters-summary.module.css";

export default function FiltersSummaryComponent(): ReactElement | null {
  const { filters, dispatchFilters } = useContext(FiltersContext);

  const isEmpty = useMemo(() => {
    return (
      !filters.query &&
      !filters.title &&
      !filters.location &&
      !filters.Company &&
      !filters.datePosted &&
      !filters.jobType
    );
  }, [filters]);

  const removeAllButtonClickHandler = (): void => {
    dispatchFilters({ type: "removed_all" });
  };

  const filterClickHandler = (key: keyof FiltersType): void => {
    dispatchFilters({ type: "removed_filter", key });
  };

  if (isEmpty) {
    return null;
  }

  return (
    <div className={styles["filters-summary"]}>
      <div className={styles.title}>Selected filter</div>

      <button type="button" onClick={removeAllButtonClickHandler}>
        Delete all
      </button>

      <ul className={styles.filters}>
        {filters.query && (
          <li onClick={() => filterClickHandler("query")}>{filters.query}</li>
        )}
        {filters.title && (
          <li onClick={() => filterClickHandler("title")}>{filters.title}</li>
        )}
        {filters.location && (
          <li onClick={() => filterClickHandler("location")}>
            {filters.location}
          </li>
        )}
        {filters.Company && (
          <li onClick={() => filterClickHandler("Company")}>
            {filters.Company}
          </li>
        )}
        {filters.datePosted && (
          <li onClick={() => filterClickHandler("datePosted")}>
            {filters.datePosted}
          </li>
        )}
        {filters.jobType && (
          <li onClick={() => filterClickHandler("jobType")}>
            {filters.jobType}
          </li>
        )}
      </ul>
    </div>
  );
}
