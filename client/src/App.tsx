import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AddTask from "./pages/AddTask";
import PrivateRoute from "./components/Private";
import Dashboard from "./pages/Dashboard";
import UpdateTask from "./pages/UpdateTask";
import { useAuth } from "./context/authProvider";



const App = () => {

  const [auth]: any = useAuth();

  return <>
    <Routes>
      {
        auth?.user ? <Route path="/" element={<Dashboard />} /> :
          <Route path="/" element={<Register />} />
      }
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="" element={<Dashboard />} />
        <Route path="add-task" element={<AddTask />} />
        <Route path="update-task/:id" element={<UpdateTask />} />
      </Route>

    </Routes>
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'toast',
        style: {
          fontSize: '20px'
        }
      }}
    />
  </>
};

export default App;