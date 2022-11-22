import React from "react";
import { UNCATEGORIZED_PRODUCT } from "../contexts";
import { useAppContext } from "../contexts";
import CategoryRow from "./CategoryRow";
const UnCategorizedProductRow = () => {
  const { products } = useAppContext();
  const isEmpty = products.every(
    ({ category }) => category !== UNCATEGORIZED_PRODUCT
  );

  if (isEmpty) {
    return null;
  }

  return (
    <CategoryRow
      name={UNCATEGORIZED_PRODUCT}
      id={UNCATEGORIZED_PRODUCT}
      uncategorized
    />
  );
};

export default UnCategorizedProductRow;
