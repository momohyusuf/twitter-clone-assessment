import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./redux/app/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster position="top-center" duration={3000} richColors />
      <App />
    </Provider>
  </BrowserRouter>
);
