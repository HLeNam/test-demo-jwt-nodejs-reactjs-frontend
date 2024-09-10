import "./Register.scss";

import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";

import { useEffect, useState } from "react";

import { registerNewUser } from "../../services/userService";

const Register = (props) => {
    const { show, setShow } = props;

    const handleClose = () => setShow(false);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    };

    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    useEffect(() => {
        // axios
        //     .get("http://localhost:8080/api/v1/test-api")
        //     .then((res) => console.log(">>> check res axios:", res));
    }, []);

    const isValidInputs = () => {
        const toastConfig = { theme: "colored", position: "bottom-center" };
        setObjCheckInput(defaultValidInput);

        if (!email) {
            toast.error("Email is required", toastConfig);
            setObjCheckInput({
                ...defaultValidInput,
                isValidEmail: false,
            });
            return false;
        }

        let validRegex = new RegExp(
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        );
        if (!validRegex.test(email)) {
            toast.error("Please enter a valid email address", toastConfig);
            setObjCheckInput({
                ...defaultValidInput,
                isValidEmail: false,
            });
            return false;
        }

        if (!phone) {
            toast.error("Phone is required", toastConfig);
            setObjCheckInput({
                ...defaultValidInput,
                isValidPhone: false,
            });
            return false;
        }

        if (!password) {
            toast.error("Password is required", toastConfig);
            setObjCheckInput({
                ...defaultValidInput,
                isValidPassword: false,
            });
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Your password is not the same.", toastConfig);
            setObjCheckInput({
                ...defaultValidInput,
                isValidConfirmPassword: false,
            });
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        let check = isValidInputs();
        const toastConfig = { theme: "colored", position: "bottom-center" };
        // let userDate = { email, phone, username, password };

        if (check === true) {
            let response = await registerNewUser(email, phone, username, password);
            let serverData = response.data;

            if (+serverData.EC === 0) {
                toast.success(serverData.EM, toastConfig);
                handleClose();
            } else {
                toast.error(serverData.EM, toastConfig);
            }
        }
    };

    return (
        <>
            <Modal className="pl-0" size="lg" backdrop="static" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row g-3 p-3 px-1">
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className={
                                    objCheckInput.isValidEmail
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                id="inputEmail4"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Email address"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputUsername" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputUsername"
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputPhoneNumber" className="form-label">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                className={
                                    objCheckInput.isValidPhone
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                id="inputPhoneNumber"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputPassword4" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className={
                                    objCheckInput.isValidPassword
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                id="inputPassword4"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputConfirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className={
                                    objCheckInput.isValidConfirmPassword
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                id="inputConfirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => handleRegister()}
                            >
                                Register
                            </button>
                        </div>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={handleClose}>
                                Already've an account? Login
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Register;
