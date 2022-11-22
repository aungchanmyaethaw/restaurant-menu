import { useEffect } from "react";
import {
  NotificationsContainer,
  Loader,
  Error,
  ProductMenu,
  UsersCheckoutModal,
  ConfirmModal,
  ThankyouModal,
} from "../components";

import { useAppContext } from "../contexts";
const Users = () => {
  const {
    isLoading,
    isError,
    handleChangeUsers,
    handleCheckoutConfirm,
    handleCheckoutCancel,
  } = useAppContext();

  useEffect(() => handleChangeUsers(), []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <NotificationsContainer />
      <UsersCheckoutModal />
      <ConfirmModal
        confirm={handleCheckoutConfirm}
        cancel={handleCheckoutCancel}
      />
      <ThankyouModal />
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

export default Users;
