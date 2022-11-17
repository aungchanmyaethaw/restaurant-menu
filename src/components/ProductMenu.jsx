import { Button } from "react-bootstrap";
import CategoryRow from "./CategoryRow";
import UnCategorizedProductRow from "./UnCategorizedProductRow";
import { useAppContext } from "../contexts";
const ProductMenu = () => {
  const { handleProductModalOpen, handleCategoryModalOpen, categories } =
    useAppContext();

  return (
    <section className="py-5">
      <h1 className="mb-4">Menu</h1>
      <div className="d-flex gap-2 align-items-center mb-4">
        <Button onClick={handleProductModalOpen}>Add Product</Button>
        <Button onClick={handleCategoryModalOpen}>Add Category</Button>
      </div>
      <hr />
      <ul
        className="p-0 mt-5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "1.25rem",
        }}
      >
        {categories.map((category) => (
          <CategoryRow {...category} key={category.id} />
        ))}
        <UnCategorizedProductRow />
      </ul>
    </section>
  );
};

export default ProductMenu;
