import { ProductModal, ProductMenu, Loader, CategoryModal } from "./components";
import { useAppContext } from "./contexts";
import NotificationsContainer from "./components/NotificationsContainer";
const App = () => {
  const { isLoading } = useAppContext();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CategoryModal />
      <ProductModal />
      <NotificationsContainer />
      <main className="container">
        <ProductMenu />
      </main>
    </>
  );
};

export default App;
