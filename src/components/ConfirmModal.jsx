import { Modal, Button } from "react-bootstrap";
import { useAppContext } from "../contexts";
const ConfirmModal = ({ confirm, cancel, id = null }) => {
  const { confirmAlert } = useAppContext();
  const { isOpen, message, payload } = confirmAlert;

  function handleConfirm() {
    if (payload) {
      confirm(payload[id]);
      cancel();
    } else {
      confirm();
    }
  }

  return (
    <Modal
      show={isOpen}
      onHide={() => {
        handleProductModalClose();
        inputReset();
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title className="text-danger">Are You Sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center fs-5 w-75 mx-auto">{message}</p>
        <Modal.Footer className="justify-content-center gap-2">
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button variant="danger" onClick={cancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;
