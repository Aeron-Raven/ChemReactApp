import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useResetPass } from "../hooks/useResetPass";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassModal, setResetPassModal] = useState(false);
  const [emailToBeReset, setEmailToBeReset] = useState("");
  const [emailSentModal, setEmailSentModal] = useState(false);

  //   Hooks
  const { login, error, isLoading } = useLogin();
  const {
    resetPass,
    error: resetError,
    isLoading: resetLoading,
  } = useResetPass();

  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempEmptyFields = [];

    if (email === "") {
      tempEmptyFields.push("email");
    }
    if (password === "") {
      tempEmptyFields.push("password");
    }
    if (tempEmptyFields.length > 0) {
      setEmptyFields(tempEmptyFields);
      return;
    }
    setEmptyFields([]);
    await login(email, password);
  };

  const handleResetPass = async () => {
    if (emailToBeReset === "") {
      return setEmptyFields(["resetpassword"]);
    }
    setEmptyFields([]);
    const success = await resetPass(emailToBeReset);
    if (success) {
      setResetPassModal(false);
      setEmailSentModal(true);
    }
  };
  const handleOpenResetModal = () => {
    setResetPassModal(true);
    setEmptyFields([]);
  };
  const handleCloseResetModal = () => {
    setEmptyFields([]);
    setResetPassModal(false);
  };

  return (
    <div>
      <form name="loginForm" id="loginForm" onSubmit={handleSubmit}>
        <h1 className="title is-large">
          Chemistry learning made easier for students and teachers
          <p className="subtitle">Hello! Please Login to your account.</p>
        </h1>
        <div id="loginEmailBox" className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="email"
              className={
                emptyFields.includes("email") ? "input is-danger" : "input"
              }
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </div>
        {emptyFields.includes("email") && (
          <div className="error">Please enter an email.</div>
        )}
        <div id="passBox" className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              className={
                emptyFields.includes("password") ? "input is-danger" : "input"
              }
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
        {emptyFields.includes("password") && (
          <div className="error">Please enter a password.</div>
        )}
        <div className="is-pulled-left">
          <Link onClick={handleOpenResetModal}>Forgot Password?</Link>
        </div>
        <div className="login-buttons">
          <button
            type="submit"
            id="loginBtn"
            className="button is-primary"
            disabled={isLoading}
          >
            Login
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
      <Modal
        click={resetPassModal}
        setClick={setResetPassModal}
        header="Reset Password"
        body={
          <div>
            <p>
              Enter your email and we will send you a link to reset your
              password.
            </p>
            <br />
            <div id="loginEmailBox" className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  onChange={(e) => setEmailToBeReset(e.target.value)}
                  value={emailToBeReset}
                />
              </div>
              {emptyFields.includes("resetpassword") && (
                <div className="error">Please enter an email.</div>
              )}
              {resetError && <div className="error">{resetError}</div>}
            </div>
          </div>
        }
        footer={
          <div className="modal-card-foot">
            <button
              className="button is-success"
              disabled={resetLoading}
              onClick={handleResetPass}
            >
              Submit
            </button>
            <button
              className="button"
              disabled={resetLoading}
              onClick={handleCloseResetModal}
            >
              Cancel
            </button>
          </div>
        }
      />
      {emailSentModal && (
        <Modal
          click={emailSentModal}
          setClick={setEmailSentModal}
          header="Email Sent"
          body={
            <p>
              A password reset email has been sent to{" "}
              <strong>{emailToBeReset}</strong>.
            </p>
          }
          footer={
            <div className="modal-card-foot">
              <button
                className="button is-primary"
                onClick={() => setEmailSentModal(false)}
              >
                Okay
              </button>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Login;
