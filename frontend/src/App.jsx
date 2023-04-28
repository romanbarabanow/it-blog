import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CookiesProvider, useCookies } from "react-cookie";

import Main from "./page/Main/Main.jsx";
import Profile from "./page/Profile/Profile.jsx";
import Chat from "./page/Chat/Chat.jsx";
import Users from "./page/Users/Users.jsx";
import ChangeProfile from "./page/ChangeProfile/ChangeProfile.jsx";
import Commentary from "./components/Commentaty/Commentary.jsx";
import Forum from "./page/Forum/Forum.jsx";
import AnswerForum from "./page/AnswerForum/AnswerForum.jsx";
import AnswersForForum from "./page/AnswersForForum/AnswersForForum.jsx";

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
              <Route element={<Commentary />} path="/commentary" />
              <Route element={<Forum />} path="/forum" />
              <Route element={<AnswerForum />} path="/forum-ask" />
              <Route element={<AnswersForForum />} path="/forum-answers" />
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
