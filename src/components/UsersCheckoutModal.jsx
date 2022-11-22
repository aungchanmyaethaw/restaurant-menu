import { useEffect, useState } from "react";
import { currencyFormatter } from "../utils";
import { QtyBadge } from "./index";
import { Modal } from "react-bootstrap";
import { SingleOrderDetails } from "./index";
import { useAppContext } from "../contexts";
const UsersCheckoutModal = () => {
  const { orders, isCheckoutModalOpen, handleCheckOutModalClose } =
    useAppContext();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    handleTotal();
  }, [orders]);

  function handleTotal() {
    const tempTotal = orders.reduce((prev, current) => prev + current.total, 0);
    setTotal(tempTotal);
  }

  return (
    <Modal
      show={isCheckoutModalOpen}
      onHide={handleCheckOutModalClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="d-flex gap-2">
          Orders
          <QtyBadge />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orders.length === 0 ? (
          <h2 className="text-info">Currently Empty...</h2>
        ) : (
          <ul className="p-1">
            <div
              className="row 
            "
            >
              <span className="col-6">Name</span>
              <span className="col-3">QTY</span>
              <span className="col-3">Total</span>
            </div>
            <hr />
            {orders.map((order) => (
              <SingleOrderDetails {...order} key={order.id} />
            ))}
          </ul>
        )}
      </Modal.Body>
      {total !== 0 && (
        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <h4 className="h4">Total</h4>
          <span className="fs-5">{currencyFormatter.format(total)}</span>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default UsersCheckoutModal;
