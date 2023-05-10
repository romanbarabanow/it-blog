import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CookiesProvider } from "react-cookie";

import Main from "./page/Main/Main.jsx";
import Profile from "./page/Profile/Profile.jsx";
import Chat from "./page/Chat/Chat.jsx";
import Users from "./page/Users/Users.jsx";
import ChangeProfile from "./page/ChangeProfile/ChangeProfile.jsx";
import Commentary from "./components/Commentaty/Commentary.jsx";
import Forum from "./page/Forum/Forum.jsx";
import AnswerForum from "./page/AnswerForum/AnswerForum.jsx";
import AnswersForForum from "./page/AnswersForForum/AnswersForForum.jsx";
import Test from "./page/Test/Test.jsx";
import FirstTest from "./page/FirstTest/FirstTest.jsx";
import Result from "./page/Result/Result.jsx";
import { useSelector } from "react-redux";
import AllUsers from "./page/AllUsers/AllUsers.jsx";
import Admin from "./page/Admin/Admin.jsx";

function App() {
  const isReg = useSelector((state) => state.user.login);
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route element={<Main />} path="/" />
          <Route element={<Forum />} path="/forum" />
          <Route element={<Admin />} path="/secret/admin-panel" />
          {isReg ? (
            <>
              <Route element={<ChangeProfile />} path="/profile-settings" />
              <Route element={<Profile />} path="/profile" />
              <Route element={<Chat />} path="/chat" />
              <Route element={<Users />} path="/users" />
              <Route element={<Commentary />} path="/commentary" />
              <Route element={<AnswerForum />} path="/forum-ask" />
              <Route element={<AnswersForForum />} path="/forum-answers" />
              <Route element={<Test />} path="/test" />
              <Route element={<FirstTest />} path="/test/1" />
              <Route element={<Result />} path="/result" />
              <Route element={<AllUsers />} path="/user" />
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
