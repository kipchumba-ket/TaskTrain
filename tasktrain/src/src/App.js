import { Switch, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LoginForm />
        </Route>
        <Route exact path="/signup">
          <SignupForm />
        </Route>
      
          
  
      </Switch>
    </div>
  );
}

export default App;
