import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
const Home = React.lazy(() => import("./pages/Home"));
const Form = React.lazy(() => import("./pages/Form"));

const App: React.FC = () => {
  return (
    <React.Suspense
      fallback={
        <div className="fallback">
          <div className="loader" />
        </div>
      }
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/add" Component={Form} />
              <Route path="/update/:id" Component={Form} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </React.Suspense>
  );
};

export default App;
