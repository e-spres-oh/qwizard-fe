import Auth from "../../utils/auth";
import { useHistory } from "react-router-dom";

const RequireAuth = (props) => {
  const history = useHistory();

  if (!Auth.isLoggedIn()) {
    history.push("/");
  }

  if (Auth.isLoggedIn()) {
    return props.children();
  }
  return null;
};

export default RequireAuth;
