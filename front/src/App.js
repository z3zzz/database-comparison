import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NewsBoard from "./components/NewsBoard"

function App() {
  return (
        <Router>
          <Header />
          <Routes>
            <Route path="/" exact element={<NewsBoard />} />
            <Route path="*" element={<h1>Page Not Found!</h1>} />
          </Routes>
        </Router>
  );
}

export default App;
