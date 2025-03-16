import { Provider } from "react-redux";
import ClientRoutes from "./pages/ClientRoutes";
import store from "./utils/store/store";

function App() {
  return (
    <Provider store={store}>  
      <ClientRoutes />
    </Provider>
  );
}

export default App;
