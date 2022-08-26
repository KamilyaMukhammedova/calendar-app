import Calendar from "./components/Calendar/Calendar";
import DayEvents from "./components/DayEvents/DayEvents";
import './App.css';

const App = () => (
  <>
    <header className="header">
      <div className="container">
        <h1>My Daily Notes</h1>
      </div>
    </header>
    <div className="container">
      <div className="flexBox">
        <Calendar/>
        <DayEvents/>
      </div>
    </div>
  </>
);

export default App;
