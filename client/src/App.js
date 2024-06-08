import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/Homepage/Homepage";
import ItemList from "./pages/ItemList/ItemList";

function App() {
  return (
    <Router>

        <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/ItemList" element={<ItemList />} />
          </Routes>
        <Footer />
    </Router>
  );
}

export default App;
