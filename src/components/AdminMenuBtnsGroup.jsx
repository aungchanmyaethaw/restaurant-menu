import React from "react";
import { Button } from "react-bootstrap";
import { useAppContext } from "../contexts";

const AdminMenuBtnsGroup = () => {
  const { handleProductModalOpen, handleCategoryModalOpen } = useAppContext();

  return (
    <div className="d-flex gap-2 align-items-center mb-4">
      <Button onClick={handleProductModalOpen}>Add Product</Button>
      <Button onClick={handleCategoryModalOpen}>Add Category</Button>
    </div>
  );
};

export default AdminMenuBtnsGroup;
