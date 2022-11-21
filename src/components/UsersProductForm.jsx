import { useAppContext } from "../contexts";
import { Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const UsersProductForm = ({
  productId,
  productName,
  qty,
  handleQtyInput,
  total,
}) => {
  const { handleAddSingleProductOrderDetails } = useAppContext();

  function handleSubmit(event) {
    event.preventDefault();
    const singleProductOrderDetails = {
      id: uuidv4(),
      productId,
      name: productName,
      total,
      qty: parseInt(qty),
    };
    handleAddSingleProductOrderDetails(singleProductOrderDetails);
    handleQtyInput(1);
  }

  return (
    <Form>
      <div className="d-flex justify-content-between justify-content-md-end align-items-center gap-2">
        <Form.Group className="d-flex  align-items-baseline gap-2">
          <Form.Label>QTY:</Form.Label>
          <Form.Control
            type="number"
            style={{ width: "5rem" }}
            min="1"
            value={qty}
            onChange={(event) => handleQtyInput(event.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          className="d-flex justify-content-center align-items-center"
          type="submit"
          onClick={handleSubmit}
        >
          <FaPlus />
        </Button>
      </div>
    </Form>
  );
};

export default UsersProductForm;
