import { useCookies } from "react-cookie";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user";

const clientId =
  "783856662014-33t35oln4i48rlo9mug4prqgurfhcbom.apps.googleusercontent.com";

const LoginGoole = ({ setReg }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser) => {
      const profile = googleUser.getBasicProfile();

      setCookie("email", profile.getEmail());
      setCookie("name", profile.getName());
      setCookie("type", "google");
      dispatch(
        setUser({
          name: profile.getName(),
          avatar_link: profile.getImageUrl(),
        })
      );
      setReg(false);
    });
  };

  return (
    <div>
      <p onClick={signIn}>Гугл</p>
    </div>
  );
};

export default LoginGoole;
