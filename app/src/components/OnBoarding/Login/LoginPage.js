import { useState } from "react";
import Button from "../../Design/Button";
import Input from "../../Design/Input";
import Styles from "./LoginPage.module.scss";
import * as yup from "yup";
import { getValidationErrors } from "../../../core/utils/validation";
import ApiError from "../../../core/error/ApiError";
import AppError from "../../../core/error/AppError";
import { login } from "../../../core/modules/Auth/api";
import { handleApiResult } from "../../../core/utils/api";
import ErrorAlert from "../../shared/ErrorAlert";
import { Link } from "react-router-dom";
import { PossibleRoutes } from "core/routing";
import Nav from "components/App/App/Homepage/Nav";

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = ({ setUser }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        login(data)
          .then((res) => handleApiResult(res))
          .then((data) => {
            setUser(data);
          })
          .catch((err) => {
            let e;
            if (typeof err.response !== "undefined") {
              e = new ApiError(err);
            }
            if (e instanceof ApiError) {
              if (e.isUnauthorized()) {
                setError(new AppError("Wrong combination"));
              } else {
                setError(e);
              }
            } else {
              setError(new AppError(err));
            }
          });
      })
      .catch((e) => {
        setErrors(getValidationErrors(e));
      });
  };

  return (
    <>
    <header>
      <Nav/>
    </header>
    <div className="middle center-form">
      <div className="container">
        <div className="text-center">
          <h1 className="title mb-5">PC-BUILDER</h1>
          <form
            className={Styles["form-signin"]}
            onSubmit={handleSubmit}
            noValidate={true}
          >
            <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
            <ErrorAlert error={error}></ErrorAlert>
            <Input
              label="Email"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <div className="specialButton">
              <div className="btnContainer">
                <Button color="primary" type="submit">
                  Log in
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-5 mb-3">
            <Link to={PossibleRoutes.Register} style={{textDecoration: "underline", color: "white"}}>Don't have an account? <span style={{fontWeight: "bold"}}>Sign up!</span></Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
