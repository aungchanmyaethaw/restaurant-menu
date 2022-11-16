import { useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useAppContext, UNCATEGORIZED_PRODUCT } from "../contexts";
import { v4 as uuidv4 } from "uuid";

const ProductForm = () => {
  const {
    categories,
    editId,
    editProduct,
    handleEditProduct,
    handleAddProduct,
    isFormOpen,
    setIsFormOpen,
  } = useAppContext();

  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();

  useEffect(() => {
    if (editId) {
      const { name, price, category } = editProduct;
      nameRef.current.value = name;
      priceRef.current.value = price;
      categoryRef.current.value = category;
    }
  }, [editId]);

  function handleSubmit(event) {
    event.preventDefault();

    const tempProduct = {
      id: editId || uuidv4(),
      name: nameRef.current.value,
      price: priceRef.current.value,
      category:
        categoryRef.current.value === UNCATEGORIZED_PRODUCT
          ? UNCATEGORIZED_PRODUCT
          : parseInt(categoryRef.current.value),
    };

    if (editId) {
      handleEditProduct(tempProduct);
    } else {
      handleAddProduct(tempProduct);
    }

    nameRef.current.value = "";
    priceRef.current.value = "";
    categoryRef.current.value = UNCATEGORIZED_PRODUCT;
  }

  if (!isFormOpen) {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" ref={nameRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Price</Form.Label>
        <Form.Control type="number" placeholder="Enter Price" ref={priceRef} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Categories</Form.Label>
        <Form.Select ref={categoryRef}>
          <option value={UNCATEGORIZED_PRODUCT}>{UNCATEGORIZED_PRODUCT}</option>
          {categories.map(({ name, id }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="d-flex justify-content-between">
        <Button variant="dark" type="submit">
          {editId ? "Edit" : "Add"}
        </Button>
        <Button
          variant="danger"
          type="submit"
          onClick={() => setIsFormOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default ProductForm;
