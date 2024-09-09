import "./Login.scss";

import Register from "../Register/Register";
import { useState } from "react";

const Login = (props) => {
    const [isShowModal, setIsShowModal] = useState(false);

    const handleCreateNewAccount = () => {
        setIsShowModal(true);
    };

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
                                    className="form-control"
                                    placeholder="Email address or phone number"
                                />
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                />
                                <button className="btn btn-primary">Login</button>
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
