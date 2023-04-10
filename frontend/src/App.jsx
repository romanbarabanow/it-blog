import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Main from "./pages/Main/Main";
import Registration from "./components/Registration/Registration";
import { useSelector } from "react-redux";

const App = () => {
  const auth = useSelector((state) => state.user.isAuth);

  return (
    <div>
      {auth ? (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
