import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NewsBoardWithConcurrency from "./components/NewsBoard-yes-concurrency";
import NewsBoardWithoutConcurrency from "./components/NewsBoard-no-concurrency";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<NewsBoardWithConcurrency />} />
        <Route
          path="/no-concurrency"
          element={<NewsBoardWithoutConcurrency />}
        />
        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
