import { Button } from "react-bootstrap";
import { useAppContext } from "../contexts";
const AdminProductBtnsGroup = ({ productId }) => {
  const { handleEditProductId, handleConfirmAlertOpen } = useAppContext();

  function handleDelete(productId, message) {
    handleConfirmAlertOpen(message, { productId });
  }

  return (
    <div className="d-flex justify-content-end gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => handleEditProductId(productId)}
      >
        Edit
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={() =>
          handleDelete(productId, "Are you sure you want to delete?")
        }
      >
        Delete
      </Button>
    </div>
  );
};

export default AdminProductBtnsGroup;
