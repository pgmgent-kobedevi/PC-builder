import { Route, Routes, Navigate } from "react-router-dom";
import { PossibleRoutes } from "../../core/routing";
import CrudRouting from "./CrudRouting";
import Home from "./App/Homepage/Home";
import Builder from "./App/Builder/Builder";
import BuildDetail from "./App/Detail/BuildDetail";

const MainRouting = () => {
  return (
    <Routes>
      <Route index path={PossibleRoutes.Home} element={<Home />} />
      <Route index path={PossibleRoutes.Builder} element={<Builder />} />
      <Route index path={PossibleRoutes.BuildDetail} element={<BuildDetail />} />
      <Route path={PossibleRoutes.CrudParent} element={<CrudRouting />} />
      <Route
        path="*"
        element={<Navigate to={PossibleRoutes.Home} replace />}
      />
    </Routes>
  );
};

export default MainRouting;
