import {
  ProductModal,
  ProductMenu,
  Loader,
  CategoryModal,
  Error,
} from "./components";
import { useAppContext } from "./contexts";
import NotificationsContainer from "./components/NotificationsContainer";
const App = () => {
  const { isLoading, isError } = useAppContext();

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

export default App;
