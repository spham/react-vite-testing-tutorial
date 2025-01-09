import "./App.css";
import Counter from "./components/Counter";
import Greeting from "./components/Greeting";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <Greeting name={"Pedro"} />
      <Counter />
      <UserProfile userId={4} />
    </>
  );
}

export default App;
