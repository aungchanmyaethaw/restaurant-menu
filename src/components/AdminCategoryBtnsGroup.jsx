import React from "react";
import { Button } from "react-bootstrap";
import { useAppContext } from "../contexts";

const AdminCategoryBtnsGroup = ({ categoryId }) => {
  const { handleEditCategoryId, handleDeleteCategory } = useAppContext();

  return (
    <div className="d-flex justify-content-end align-items-center gap-2 mt-5">
      <Button
        variant="secondary"
        onClick={() => handleEditCategoryId(categoryId)}
      >
        Edit Category
      </Button>
      <Button
        variant="outline-danger"
        onClick={() => handleDeleteCategory(categoryId)}
      >
        Delete Category
      </Button>
    </div>
  );
};

export default AdminCategoryBtnsGroup;
