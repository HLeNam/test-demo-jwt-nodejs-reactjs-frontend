import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <Router>
            <div className="app-container">
                <Nav></Nav>
                <Switch>
                    <Route path="/" exact>
                        home
                    </Route>
                    <Route path="/news">news</Route>
                    <Route path="/about">about</Route>
                    <Route path="/contact">contact</Route>
                    <Route path="/login">
                        <Login></Login>
                    </Route>
                    <Route path="*">404 not found</Route>
                </Switch>
            </div>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Router>
    );
}

export default App;
