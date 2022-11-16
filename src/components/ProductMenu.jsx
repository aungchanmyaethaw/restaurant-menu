import { Button } from "react-bootstrap";
import CategoryRow from "./CategoryRow";
import UnCategorizedProductRow from "./UnCategorizedProductRow";
import { useAppContext } from "../contexts";
const ProductMenu = () => {
  const { setIsFormOpen, handleModalOpen, categories } = useAppContext();

  return (
    <section>
      <h4 className="mb-4">Menu</h4>
      <ul className="p-0">
        {categories.map((category) => (
          <CategoryRow {...category} key={category.id} />
        ))}
        <UnCategorizedProductRow />
      </ul>
      <div className="d-flex gap-2 align-items-center">
        <Button onClick={() => setIsFormOpen(true)}>Add Product</Button>
        <Button onClick={handleModalOpen}>Add Category</Button>
      </div>
    </section>
  );
};

export default ProductMenu;
