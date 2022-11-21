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
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,auto))",
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
