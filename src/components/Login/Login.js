import "./Login.scss";

import Register from "../Register/Register";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = (props) => {
    const history = useHistory();

    const [isShowModal, setIsShowModal] = useState(false);

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    };
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const handleCreateNewAccount = () => {
        setIsShowModal(true);
    };

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);

        if (!valueLogin) {
            toast.error("Please your email address or phone number", {
                theme: "colored",
                position: "bottom-center",
            });

            setObjValidInput({
                ...defaultObjValidInput,
                isValidValueLogin: false,
            });

            return;
        }

        if (!password) {
            toast.error("Please your password", {
                theme: "colored",
                position: "bottom-center",
            });

            setObjValidInput({
                ...defaultObjValidInput,
                isValidPassword: false,
            });
            return;
        }

        let response = await loginUser(valueLogin, password);

        if (response && response.data && +response.data.EC === 0) {
            let data = {
                isAuthenticated: true,
                token: "fake token",
            };

            sessionStorage.setItem("account", JSON.stringify(data));

            // success
            history.push("/users");
            window.location.reload();
        }
        if (response && response.data && +response.data.EC !== 0) {
            toast.error(response.data.EM, {
                theme: "colored",
                position: "bottom-center",
            });
        }
    };

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === "Enter") {
            handleLogin();
        }
    };

    useEffect(() => {
        let session = sessionStorage.getItem("account");

        if (session) {
            history.push("/");
        }
    }, []);

    return (
        <>
            <div className="login-container pt-3 px-3 px-sm-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-12 content-left">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <div className="text-uppercase fs-2 text-primary fw-bold text-center text-md-start mb-3 mb-md-0">
                                    Hoi Dan It
                                </div>
                                <div className="fs-5 d-none d-md-block">
                                    Hoi Dan It helps you connect and share with the people in your
                                    life.
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 col-12 content-right">
                            <div className="row row-cols-1 g-3 p-3">
                                <input
                                    type="email"
                                    className={
                                        objValidInput.isValidValueLogin
                                            ? "form-control"
                                            : "form-control is-invalid"
                                    }
                                    placeholder="Email address or phone number"
                                    value={valueLogin}
                                    onChange={(event) => setValueLogin(event.target.value)}
                                />
                                <input
                                    type="password"
                                    className={
                                        objValidInput.isValidPassword
                                            ? "form-control"
                                            : "form-control is-invalid"
                                    }
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    onKeyPress={(event) => handlePressEnter(event)}
                                />
                                <button className="btn btn-primary" onClick={() => handleLogin()}>
                                    Login
                                </button>
                                <span className="text-center">
                                    <a href="#!" className="forgot-password">
                                        Forgot your password?
                                    </a>
                                </span>
                                <hr />
                                <div className="text-center">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleCreateNewAccount()}
                                    >
                                        Create new account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Register show={isShowModal} setShow={setIsShowModal}></Register>
        </>
    );
};

export default Login;
