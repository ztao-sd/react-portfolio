import { Outlet, useLocation } from "react-router-dom";
import Background from "@/components/Background";
import NavigationBar from "@/components/NavigationBar";
import HomePage from "./Home";

const Root = () => {
  const location = useLocation();

  return (
    <div className="min-h-fit font-mono antialiased">
      <Background></Background>
      <NavigationBar></NavigationBar>
      <div className="relative">
        {location.pathname === "/" ? <HomePage></HomePage> : <Outlet></Outlet>}
      </div>
    </div>
  );
};

export default Root;
