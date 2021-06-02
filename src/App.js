import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import "./static/css/base.css";
import "./static/css/global.css";
import "./static/css/grid.css";
import "./static/css/fonts.css";
import { fetchMe } from "./utils/request";
import { Helmet } from "react-helmet";

fetchMe();

function App() {
  return (
    <>
      <Helmet>
        <title>Qwizard</title>
      </Helmet>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
        }}
        className="App"
      >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
