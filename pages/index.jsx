import Home from "./components/sections/Home";
import { Analytics } from "@vercel/analytics/react";

const Main = () => {
  return (
    <div className="overflow-hidden">
      <Analytics />
      <Home />
    </div>
  );
};
export default Main;
