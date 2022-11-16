import { ProductForm, ProductMenu, Loader } from "./components";
import { useAppContext } from "./contexts";
const App = () => {
  const { isLoading } = useAppContext();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col-12 col-lg-6 p-4 bg-secondary bg-opacity-25 rounded-3">
          <ProductForm />
        </div>
        <div className="col-12 col-lg-6 p-4 bg-info bg-opacity-50 rounded-3">
          <ProductMenu />
        </div>
      </div>
    </main>
  );
};

export default App;
