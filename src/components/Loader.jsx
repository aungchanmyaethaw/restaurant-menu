import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center gap-3 py-5">
      <Spinner animation="grow" className="p-3" variant="info" />
      <Spinner animation="grow" className="p-3" variant="info" />
      <Spinner animation="grow" className="p-3" variant="info" />
    </div>
  );
};

export default Loader;
