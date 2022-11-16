import React from "react";
import { UNCATEGORIZED_PRODUCT } from "../contexts";
import CategoryRow from "./CategoryRow";
const UnCategorizedProductRow = () => {
  return (
    <CategoryRow
      name={UNCATEGORIZED_PRODUCT}
      id={UNCATEGORIZED_PRODUCT}
      uncategorized
    />
  );
};

export default UnCategorizedProductRow;
