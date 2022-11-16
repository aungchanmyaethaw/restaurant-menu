import { useEffect, useState } from "react";
import { useAppContext, UNCATEGORIZED_PRODUCT } from "../contexts";
import { ProductRow } from "../components";
const CategoryRow = ({ id, name, uncategorized = false }) => {
  const { products } = useAppContext();
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
    <article className="mb-5 p-2">
      <h5 className="mb-3 text-capitalize">{name}</h5>
      {filteredProducts.map((product, index) => (
        <ProductRow
          {...product}
          key={product.id}
          lastIndex={filteredProducts.length - 1}
          index={index}
        />
      ))}
      <hr />
    </article>
  );
};

export default CategoryRow;
