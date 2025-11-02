import { Outlet } from "react-router-dom";
import ReactToast from "../../common/toast/ReactToast";
import TopNavBar from "./TopNavBar";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <>
      <ReactToast />
      <div className="d-flex">
        <div className="w-100" style={{ height: "100vh" }}>
          <TopNavBar />
          <div className="">
            <div className="shadow rounded-1 bg-light-subtle h-100">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AppLayout;
