import Navbar from "./components/Navbar/Navbar";
import Features from "./containers/Featured";
import Store from "./containers/Store";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Features />
        <Store />
      </main>
    </div>
  );
}

export default App;
