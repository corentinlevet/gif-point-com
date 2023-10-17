import { Routes, Route } from "react-router-dom";
import About from "../About/About";
import Collection from "../Collection/Collection";
import Home from "../Home/Home";
import Generate from "../Generate/Generate";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </div>
  );
}

export default Router;
