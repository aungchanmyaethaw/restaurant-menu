import { ProductForm, ProductMenu, Loader, CategoryModal } from "./components";
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
      <main className="container">
        <NotificationsContainer />
        <div className="row">
          <div
            className="col-12 col-lg-6 p-4 bg-secondary bg-opacity-25 rounded-3"
            style={{ minHeight: "50vh" }}
          >
            <ProductForm />
          </div>
          <div className="col-12 col-lg-6 p-4 bg-info bg-opacity-50 rounded-3">
            <ProductMenu />
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
