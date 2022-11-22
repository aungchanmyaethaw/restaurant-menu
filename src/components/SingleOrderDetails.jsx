import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import { useAppContext } from "../contexts";
const SingleOrderDetails = ({ id, name, qty, total }) => {
  const [orderedQty, setOrderedQty] = useState(qty);
  const [orderedTotal, setOrderedTotal] = useState(total);

  const pricePerProduct = total / qty;
  const {
    handleOrderChangesFromUsersModal,
    handleOrderDelete,
    isCheckoutConfirm,
  } = useAppContext();

  function handleOrderChanges(newQty) {
    if (newQty === 0) {
      handleOrderDelete(id);
      return;
    }

    setOrderedQty(newQty);
    setOrderedTotal(newQty * pricePerProduct);
  }

  useEffect(() => {
    handleOrderChangesFromUsersModal(id, orderedQty, orderedTotal);
  }, [orderedQty]);

  if (orderedQty === 0) {
    return null;
  }
  return (
    <div className="row mb-3" key={id}>
      <span className="col-6 text-capitalize">{name}</span>
      <div className="col-3">
        {isCheckoutConfirm ? (
          orderedQty
        ) : (
          <Form.Control
            type="number"
            value={orderedQty}
            onChange={(e) => handleOrderChanges(parseInt(e.target.value))}
            style={{ width: "5rem" }}
          />
        )}
      </div>

      <span className="col-3">{currencyFormatter.format(orderedTotal)}</span>
    </div>
  );
};

export default SingleOrderDetails;
