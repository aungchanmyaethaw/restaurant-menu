import { Button } from "react-bootstrap";
import { useAppContext } from "../contexts";
const AdminProductBtnsGroup = ({ productId }) => {
  const { handleEditProductId, handleDeleteProduct } = useAppContext();

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
        onClick={() => handleDeleteProduct(productId)}
      >
        Delete
      </Button>
    </div>
  );
};

export default AdminProductBtnsGroup;
