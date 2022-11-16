import { useRef, useEffect } from "react";
import { useAppContext } from "../contexts";
import { Modal, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
const CategoryModal = () => {
  const {
    categories,
    handleModalOpen,
    handleModalClose,
    isModalShow,
    handleAddCategory,
    editCategory,
    editCategoryId,
    handleEditCategory,
  } = useAppContext();

  const categoryRef = useRef();

  useEffect(() => {
    if (editCategoryId) {
      handleModalOpen();
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
      handleEditCategory(tempCategory);
    } else {
      const isSameCategory = categories.every(
        ({ name }) => name !== tempCategory.name
      );

      if (isSameCategory) {
        handleAddCategory(tempCategory);
      }
    }
    handleModalClose();
  }

  return (
    <Modal
      show={isModalShow}
      onHide={handleModalClose}
      backdrop="static"
      keyboard={false}
      centered
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
            <Form.Control type="text" ref={categoryRef} autoFocus />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}>
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