import { Routes, Route, Navigate } from "react-router";
import routes from "./app-routes";
import RootLayout from "./layout/RootLayout";
import Timeline from "./app-screens/timeline/TImeline";
import ProtectedLayout from "./layout/ProtectedLayout";
import { useAppSelector } from "./redux/app/hooks";

const App = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={user ? <Navigate to="/timeline" /> : route.element}
          />
        ))}
        <Route element={<ProtectedLayout />}>
          <Route path="/timeline" element={<Timeline />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
