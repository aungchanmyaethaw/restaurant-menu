import { useRef, useEffect, useState, useMemo } from "react";
import { useAppContext, UNCATEGORIZED_PRODUCT } from "../contexts";
import { Modal, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
const CategoryModal = () => {
  const {
    categories,
    handleCategoryModalClose,
    isCategoryModalShow,
    handleAddCategory,
    editCategory,
    editCategoryId,
    handleEditCategory,
    handleAddingNotification,
  } = useAppContext();
  const [category, setCategory] = useState("");
  const [nameError, setNameError] = useState(false);

  const inputReset = () => {
    setCategory("");
  };

  const categoryCheck = (name) => {
    let result = [];

    if (editCategoryId) {
      result = categories
        .filter((category) => category.id !== editCategoryId)
        .every(
          (category) =>
            category.name.toLowerCase() !== name?.toLowerCase() &&
            UNCATEGORIZED_PRODUCT !== name?.toLowerCase()
        );
    } else {
      result = categories.every(
        (category) =>
          category.name.toLowerCase() !== name?.toLowerCase() &&
          UNCATEGORIZED_PRODUCT !== name?.toLowerCase()
      );
    }
    if (!result) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  useEffect(() => {
    if (editCategoryId) {
      const { name } = editCategory;
      setCategory(name);
    }
  }, [editCategoryId]);

  useEffect(() => {
    categoryCheck(category);
  }, [category]);

  function handleSubmit(event) {
    event.preventDefault();

    const tempCategory = {
      id: editCategoryId || uuidv4(),
      name: category.trim(),
    };
    if (editCategoryId) {
      if (nameError) {
        handleAddingNotification("danger", "Category editing failed.");
        return;
      }
      handleEditCategory(tempCategory);
    } else {
      if (nameError) {
        handleAddingNotification("danger", "Category editing failed.");
        return;
      }
      handleAddCategory(tempCategory);
    }
    handleCategoryModalClose();
    inputReset();
  }

  return (
    <Modal
      show={isCategoryModalShow}
      onHide={() => {
        handleCategoryModalClose();
        inputReset();
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{editCategoryId ? "Edit" : "Add"} Category</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label className="text-danger">
              Please don't add already exist category.
            </Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoFocus
              className={`${nameError && "error"} mb-1`}
            />
            {nameError && (
              <span className="text-danger">category already existed.</span>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handleCategoryModalClose();
              inputReset();
            }}
          >
            Cancel
          </Button>
          <Button variant="dark" type="submit">
            {editCategoryId ? "Edit" : "Add"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
