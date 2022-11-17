import { useEffect, useState } from "react";
import { useAppContext, UNCATEGORIZED_PRODUCT } from "../contexts";
import { ProductRow } from "../components";
import { Button } from "react-bootstrap";
const CategoryRow = ({ id, name, uncategorized = false }) => {
  const { products, handleEditCategoryId, handleDeleteCategory } =
    useAppContext();
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
    <article className=" p-4 bg-info bg-opacity-50 rounded">
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
      {!uncategorized && (
        <div className="d-flex justify-content-end align-items-center gap-2 mt-5">
          <Button variant="secondary" onClick={() => handleEditCategoryId(id)}>
            Edit Category
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => handleDeleteCategory(id)}
          >
            Delete Category
          </Button>
        </div>
      )}
    </article>
  );
};

export default CategoryRow;
