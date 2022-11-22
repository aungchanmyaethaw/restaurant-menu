import {
  CategoryRow,
  UnCategorizedProductRow,
  AdminMenuBtnsGroup,
  UsersCheckoutBtn,
} from "./index";
import { useAppContext, UNCATEGORIZED_PRODUCT } from "../contexts";
const ProductMenu = () => {
  const { categories, products, isAdmin } = useAppContext();

  const isEmpty = () =>
    categories.length === 0 &&
    products.every((product) => product.category !== UNCATEGORIZED_PRODUCT);

  return (
    <section className="py-5">
      <h1 className="mb-4">Menu</h1>
      {isAdmin ? <AdminMenuBtnsGroup /> : <UsersCheckoutBtn />}
      <hr />
      <ul
        className="p-0 mt-5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(480px,1fr))",
          gap: "1.25rem",
        }}
      >
        {isEmpty() ? (
          <h2 className="text-info">Currently Empty...</h2>
        ) : (
          categories.map((category) => (
            <CategoryRow {...category} key={category.id} />
          ))
        )}
        <UnCategorizedProductRow />
      </ul>
    </section>
  );
};

export default ProductMenu;
