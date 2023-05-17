import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Login from "./Component/Login";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import DashboardUser from "./Component/DashboardUser";

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Login/>,
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
        },
        {
            path: '/dashboard-user',
            element: <DashboardUser />,
        },
    ])
  return (
    <div className="">
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
