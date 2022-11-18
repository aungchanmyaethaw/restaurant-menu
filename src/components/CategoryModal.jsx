import { useRef, useEffect, useState, useMemo } from "react";
import { useAppContext } from "../contexts";
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

  const [nameError, setNameError] = useState();
  const categoryRef = useRef();

  const categoryCheck = (name) => {
    let result = [];

    if (editCategoryId) {
      result = categories
        .filter((category) => category.id !== editCategoryId)
        .every(
          (category) => category.name.toLowerCase() !== name?.toLowerCase()
        );
    } else {
      result = categories.every(
        (category) => category.name.toLowerCase() !== name?.toLowerCase()
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
      categoryRef.current.value = name;
    }
  }, [editCategoryId]);

  function handleSubmit(event) {
    event.preventDefault();

    const tempCategory = {
      id: editCategoryId || uuidv4(),
      name: categoryRef.current.value,
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
  }

  useMemo(
    () => categoryCheck(categoryRef.current?.value),
    [categoryRef.current?.value]
  );

  return (
    <Modal
      show={isCategoryModalShow}
      onHide={handleCategoryModalClose}
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
              ref={categoryRef}
              autoFocus
              className={`${nameError && "error"} mb-1`}
            />
            {nameError && (
              <span className="text-danger">category already existed.</span>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCategoryModalClose}>
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
