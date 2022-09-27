import { BrowserRouter as Router, Switch, Routes, Route} from "react-router-dom";
import './App.css';
import PayrollForm from "./Components/payroll-form/payroll-form";


function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
          <Route path=""><PayrollForm/></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
