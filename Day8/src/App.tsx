import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
};

export default App;