import { useEffect, useState } from "react";
import { useAppContext, UNCATEGORIZED_PRODUCT } from "../contexts";
import { ProductRow, AdminCategoryBtnsGroup } from "./index";

const CategoryRow = ({ id, name, uncategorized = false }) => {
  const { products, isAdmin } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (uncategorized) {
      setFilteredProducts(
        products.filter((product) => product.category === UNCATEGORIZED_PRODUCT)
      );
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === id)
      );
    }
  }, [products]);

  return (
    <article
      className={`p-4  rounded ${
        uncategorized ? "bg-secondary bg-opacity-25" : "bg-info bg-opacity-50"
      }`}
    >
      <h4 className="mb-4 text-capitalize">{name}</h4>

      {filteredProducts.map((product, index) => (
        <ProductRow
          {...product}
          key={product.id}
          lastIndex={filteredProducts.length - 1}
          index={index}
        />
      ))}
      <hr />

      {!uncategorized && isAdmin && <AdminCategoryBtnsGroup categoryId={id} />}
    </article>
  );
};

export default CategoryRow;
