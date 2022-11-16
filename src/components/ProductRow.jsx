import React from "react";
import { Button } from "react-bootstrap";
import { useAppContext } from "../contexts";
const ProductRow = ({ id, name, price, lastIndex, index }) => {
  const { handleDeleteProduct, handleEditProductId } = useAppContext();
  return (
    <div
      className={`d-flex justify-content-between align-items-center gap-4 ${
        lastIndex !== index ? "mb-2" : ""
      }`}
    >
      <div className="d-flex justify-content-between flex-grow-1">
        <span>{name}</span>
        <span>{price}</span>
      </div>

      <div className="d-flex gap-2">
        <Button
          variant="warning"
          size="sm"
          onClick={() => handleEditProductId(id)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDeleteProduct(id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductRow;
