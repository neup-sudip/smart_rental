import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./component/auth/Auth";
import Home from "./component/home/Home";
import PageNotFound from "./common/PageNotFound";
import Public from "./common/Public";
import Protected from "./common/Protected";
import AppLayout from "./component/layouts/AppLayout";
import AllProperty from "./component/property/AllProperty";
import PropertyView from "./component/property/PropertyView";
import PropertyForm from "./component/property/PropertyForm";
import Profile from "./component/profile/Profile";
import EditProperty from "./component/property/EditProperty";

function App() {
  const { profile } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />

        <Route path="/auth" element={<Public profile={profile} />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<Auth />} />
        </Route>

        <Route path="/profile" element={<Protected profile={profile} />}>
          <Route index element={<Profile />} />
        </Route>

        <Route path="property/">
          <Route index element={<AllProperty />} />

          <Route path="" element={<Protected profile={profile} />}>
            <Route path="add" element={<PropertyForm />} />
            <Route path="edit/:id" element={<EditProperty />} />
          </Route>

          <Route path="view/:id">
            <Route index element={<PropertyView />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
