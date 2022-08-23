import Calendar from "./components/Calendar/Calendar";
import './App.css';

const App = () => (
  <>
    <header className="header">
      <div className="container">
        <h1>My Daily Notes</h1>
      </div>
    </header>
    <div className="container">
      <Calendar/>
    </div>
  </>
);

export default App;
