import { useEffect } from "react";
import {
  ProductModal,
  ProductMenu,
  Loader,
  CategoryModal,
  Error,
  NotificationsContainer,
} from "../components";
import { useAppContext } from "../contexts";

const Admin = () => {
  const { isLoading, isError, handleChangeAdmin } = useAppContext();

  useEffect(() => {
    handleChangeAdmin();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CategoryModal />
      <ProductModal />
      <NotificationsContainer />
      {isError ? (
        <Error />
      ) : (
        <main className="container">
          <ProductMenu />
        </main>
      )}
    </>
  );
};

export default Admin;
