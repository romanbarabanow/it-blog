import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Main from "./page/Main/Main.jsx";

import { CookiesProvider, useCookies } from "react-cookie";
import Profile from "./page/Profile/Profile.jsx";
import Chat from "./page/Chat/Chat.jsx";
import Users from "./page/Users/Users.jsx";
import ChangeProfile from "./page/ChangeProfile/ChangeProfile.jsx";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route element={<Main />} path="/" />
          {cookies.email ? (
            <>
              <Route element={<ChangeProfile />} path="/profile-settings" />
              <Route element={<Profile />} path="/profile" />
              <Route element={<Chat />} path="/chat" />
              <Route element={<Users />} path="/users" />
            </>
          ) : (
            ""
          )}
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
