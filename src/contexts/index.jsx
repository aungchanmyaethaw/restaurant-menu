import { useContext, createContext, useState, useEffect } from "react";
const AppContext = createContext();

export const UNCATEGORIZED_PRODUCT = "uncategorized";

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editProduct, setEditProduct] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getData = async (url, setState) => {
    const res = await fetch(url);
    const data = await res.json();
    setState(data);
  };

  useEffect(() => {
    setIsLoading(true);
    getData("http://localhost:8000/sampleProducts", setProducts);
    getData("http://localhost:8000/categories", setCategories);
    setIsLoading(false);
  }, []);

  // Delete Products

  function handleDeleteProduct(productId) {
    const filteredProducts = products.filter(({ id }) => id !== productId);
    fetch("http://localhost:8000/sampleProducts/" + productId, {
      method: "DELETE",
    }).then(() => setProducts(filteredProducts));
  }

  // Edit Products

  function handleEditProductId(productId) {
    setIsFormOpen(true);
    setEditId(productId);
    const tempProduct = products.find((product) => product.id === productId);
    setEditProduct(tempProduct);
  }

  function handleEditProduct(editedProduct) {
    fetch("http://localhost:8000/sampleProducts/" + editId, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editedProduct),
    }).then(() => handlEditProductInUI(editedProduct));
  }

  function handlEditProductInUI(editedProduct) {
    const newProducts = products.map((product) => {
      if (product.id === editedProduct.id) {
        return editedProduct;
      }
      return product;
    });
    setProducts(newProducts);
    setEditId(null);
    setEditProduct({});
  }

  // Add Products

  function handleAddProduct(addedProduct) {
    fetch("http://localhost:8000/sampleProducts/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(addedProduct),
    }).then(() => setProducts((prev) => [...prev, addedProduct]));
  }

  return (
    <AppContext.Provider
      value={{
        categories,
        products,
        editId,
        handleDeleteProduct,
        handleEditProductId,
        handleEditProduct,
        handleAddProduct,
        editProduct,
        isFormOpen,
        setIsFormOpen,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
