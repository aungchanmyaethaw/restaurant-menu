import { useEffect, useState } from "react";
import { currencyFormatter } from "../utils";
import { QtyBadge } from "./index";
import { Modal, Button } from "react-bootstrap";
import { SingleOrderDetails } from "./index";
import { useAppContext } from "../contexts";
const UsersCheckoutModal = () => {
  const {
    orders,
    isCheckoutModalOpen,
    handleCheckOutModalClose,
    handleConfirmAlertOpen,
    isCheckoutConfirm,
  } = useAppContext();
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
        <Modal.Footer className="d-block">
          <div className="d-flex justify-content-between mb-4">
            <h4 className="h4">Total</h4>
            <span className="fs-5">{currencyFormatter.format(total)}</span>
          </div>
          <div className="d-flex justify-content-center">
            {isCheckoutConfirm ? (
              <Button variant="dark" onClick={handleCheckOutModalClose}>
                Close
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleConfirmAlertOpen(
                    "Are you sure you want to checkout? This Actions can't be undone."
                  )
                }
              >
                Confirm
              </Button>
            )}
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default UsersCheckoutModal;
