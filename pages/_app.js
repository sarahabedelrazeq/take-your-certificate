import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "../store";
import "bootstrap/dist/css/bootstrap.css";
import "../sass/index.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
