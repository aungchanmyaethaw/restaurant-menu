import {
  CategoryRow,
  UnCategorizedProductRow,
  AdminMenuBtnsGroup,
  UsersCheckoutBtn,
} from "./index";
import { useAppContext } from "../contexts";
const ProductMenu = () => {
  const { categories, isAdmin } = useAppContext();

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
        {categories.length !== 0 ? (
          categories.map((category) => (
            <CategoryRow {...category} key={category.id} />
          ))
        ) : (
          <h2 className="text-info">Currently Empty...</h2>
        )}
        <UnCategorizedProductRow />
      </ul>
    </section>
  );
};

export default ProductMenu;
