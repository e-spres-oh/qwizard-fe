import Auth from "../../utils/auth";
import { useHistory } from "react-router-dom";

const RequireUnauth = (props) => {
  const history = useHistory();
  if (Auth.isLoggedIn()) {
    history.push("/library/current");
  }

  if (!Auth.isLoggedIn()) {
    return props.children();
  }
  return null;
};

export default RequireUnauth;
