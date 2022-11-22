import { Modal, Button } from "react-bootstrap";
import { useAppContext } from "../contexts";
const ThankyouModal = () => {
  const { isThankyouOpen, handleThankyouModalClose } = useAppContext();

  return (
    <Modal
      show={isThankyouOpen}
      onHide={handleThankyouModalClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title className="text-success">Thank you!!! 💚</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center fs-5">Please wait. Your orders are coming!</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="dark" onClick={handleThankyouModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ThankyouModal;
