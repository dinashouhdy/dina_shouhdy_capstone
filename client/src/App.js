import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import ItemList from "./pages/ItemList/ItemList";

function App() {
  return (
    <Router>
      <Header /> 
      <Routes> 
        <Route path="/" element={<Homepage />} /> 
        <Route path="/ItemList" element={<ItemList />} />
        <Route path="/:tripId/:username" element={<ItemList />} />

        {/* Route with new component with query params to get the id of the trip */}
      </Routes>
    </Router>
  );
}

export default App;

