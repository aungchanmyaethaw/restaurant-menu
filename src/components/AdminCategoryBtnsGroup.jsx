import React from "react";
import { Button } from "react-bootstrap";
import { useAppContext } from "../contexts";

const AdminCategoryBtnsGroup = ({ categoryId }) => {
  const { handleEditCategoryId, handleConfirmAlertOpen } = useAppContext();

  function handleDelete(categoryId, message) {
    handleConfirmAlertOpen(message, { categoryId });
  }

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
        onClick={() =>
          handleDelete(categoryId, "Are you sure you want to delete?")
        }
      >
        Delete Category
      </Button>
    </div>
  );
};

export default AdminCategoryBtnsGroup;
