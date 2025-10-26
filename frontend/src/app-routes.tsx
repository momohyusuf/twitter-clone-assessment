import Login from "./app-screens/auth/Login";
import Home from "./app-screens/Home";

import Register from "./app-screens/auth/Register";
import type { JSX } from "react/jsx-dev-runtime";

interface Route {
  path: string;
  element: JSX.Element;
}

const routes: Route[] = [
  { path: "/", element: <Home /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
];

export default routes;
