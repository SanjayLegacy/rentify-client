import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import PropertiesView from "./Pages/PropertiesView";
import NavBar from "./components/navbar";
import Registration from "./Pages/Registration";
import MyPropertiesView from "./Pages/MyPropertiesView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/register"} element={<Registration />} />
          <Route path={"/"} element={<Login />} />
          <Route element={<NavBar />}>
            <Route path={"/properties"} element={<PropertiesView />} />
            <Route path={"/myProperties"} element={<MyPropertiesView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
