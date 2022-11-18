import { useEffect, useRef, useState, useMemo } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useAppContext, UNCATEGORIZED_PRODUCT } from "../contexts";
import { v4 as uuidv4 } from "uuid";

const ProductCategory = () => {
  const {
    categories,
    products,
    editProductId,
    editProduct,
    handleEditProduct,
    handleAddProduct,
    isProductModalShow,
    handleProductModalClose,
    handleAddingNotification,
  } = useAppContext();

  const [numberError, setNumberError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();

  const priceCheck = (price) => {
    if (price < 0) {
      setNumberError(true);
    } else {
      setNumberError(false);
    }
  };

  const nameCheck = (name) => {
    let result = [];

    if (editProductId) {
      result = products
        .filter((product) => product.id !== editProductId)
        .every((product) => product.name.toLowerCase() !== name?.toLowerCase());
    } else {
      result = products.every(
        (product) => product.name.toLowerCase() !== name?.toLowerCase()
      );
    }
    if (!result) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  useMemo(() => priceCheck(priceRef.current?.value), [priceRef.current?.value]);
  useMemo(() => nameCheck(nameRef.current?.value), [nameRef.current?.value]);

  useEffect(() => {
    if (editProductId) {
      const { name, price, category } = editProduct;
      nameRef.current.value = name;
      priceRef.current.value = price;
      categoryRef.current.value = category;
    }
  }, [editProductId]);

  function handleSubmit(event) {
    event.preventDefault();

    const tempProduct = {
      id: editProductId || uuidv4(),
      name: nameRef.current.value,
      price: parseInt(priceRef.current.value),
      category:
        categoryRef.current.value === UNCATEGORIZED_PRODUCT
          ? UNCATEGORIZED_PRODUCT
          : categoryRef.current.value,
    };

    if (editProductId) {
      if (numberError || nameError) {
        handleAddingNotification("danger", "Product editing failed.");
        return;
      }
      handleEditProduct(tempProduct);
    } else {
      if (numberError || nameError) {
        handleAddingNotification("danger", "Product adding failed.");

        return;
      }
      handleAddProduct(tempProduct);
    }

    handleProductModalClose();
  }

  return (
    <Modal
      show={isProductModalShow}
      onHide={handleProductModalClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{editProductId ? "Edit" : "Add"} Product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              ref={nameRef}
              autoFocus
              className={`${nameError && "error"} mb-1`}
            />
            {nameError && <span className="text-danger">Already exist.</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Price</Form.Label>

            <Form.Control
              type="number"
              placeholder="Enter Price"
              min="0"
              ref={priceRef}
              className={`${numberError && "error"} mb-1`}
            />
            {numberError && (
              <span className="text-danger">
                Negative numbers are not accepted.
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categories</Form.Label>
            <Form.Select ref={categoryRef}>
              <option value={UNCATEGORIZED_PRODUCT}>
                {UNCATEGORIZED_PRODUCT}
              </option>
              {categories.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="dark" type="submit">
              {editProductId ? "Edit" : "Add"}
            </Button>
            <Button variant="danger" onClick={handleProductModalClose}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default ProductCategory;
