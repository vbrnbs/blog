import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Blog from "./components/Blog";
// import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />} />
        {/*<Route path="/admin" element={<Admin />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
