import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import MobileInput from './components/MobileInput'
import UserDetails from './components/UserDetails'
import { Route, Switch } from "react-router-dom";

//main app and base routes
function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={MobileInput} />
        <Route path="/userdetails" component={UserDetails} />
      </Switch>
    </div>
  );
}

export default App;
