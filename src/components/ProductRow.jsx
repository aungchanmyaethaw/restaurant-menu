import { useEffect, useState } from "react";
import { useAppContext } from "../contexts";
import { currencyFormatter } from "../utils";
import { AdminProductBtnsGroup, UsersProductForm } from "./index";
const ProductRow = ({ id, name, price, lastIndex, index }) => {
  const { isAdmin } = useAppContext();
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(price);

  function handleEachProductTotal() {
    setTotal(() => qty * price);
  }

  useEffect(() => {
    handleEachProductTotal();
  }, [qty]);

  return (
    <div
      className={`d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 ${
        lastIndex !== index ? "mb-4" : ""
      }`}
    >
      <div className="d-flex justify-content-between  flex-grow-1">
        <span className="text-capitalize">{name}</span>
        <span>
          {isAdmin
            ? currencyFormatter.format(price)
            : currencyFormatter.format(total)}
        </span>
      </div>

      {isAdmin ? (
        <AdminProductBtnsGroup productId={id} />
      ) : (
        <UsersProductForm
          productId={id}
          productPrice={price}
          productName={name}
          qty={qty}
          handleQtyInput={setQty}
          total={total}
        />
      )}
    </div>
  );
};

export default ProductRow;
