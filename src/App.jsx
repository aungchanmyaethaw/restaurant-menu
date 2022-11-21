import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import { PageNavbar } from "./components";
const App = () => {
  return (
    <>
      <Router>
        <PageNavbar />
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/users" element={<Users />} />
          <Route />
        </Routes>
      </Router>
    </>
  );
};

export default App;
