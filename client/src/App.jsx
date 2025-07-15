import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import URLForm from "./components/URLForm";
import StatisticsPage from "./components/StatisticsPage";
import RedirectPage from "./components/RedirectPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<URLForm />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/:shortcode" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
