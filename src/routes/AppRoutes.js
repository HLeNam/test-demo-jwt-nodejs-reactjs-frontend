import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Login from "../components/Login/Login";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (props) => {
    return (
        <>
            <Switch>
                {/* <Route path="/project">project</Route> */}

                <PrivateRoutes path="/users" component={Users}></PrivateRoutes>
                <PrivateRoutes path="/projects" component={Users}></PrivateRoutes>

                <Route path="/login">
                    <Login></Login>
                </Route>

                <Route path="/" exact>
                    home
                </Route>
                <Route path="*">404 not found</Route>
            </Switch>
        </>
    );
};

export default AppRoutes;
