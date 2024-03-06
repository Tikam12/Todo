import React from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { toast } from "react-toastify";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(`${window.location.origin}/api/v1/signin`, Inputs);
      if (response.data.message) {
        alert(response.data.message);
      }
      else {
        if (response.data) {
          sessionStorage.setItem("id", response.data.user._id);
          dispatch(authActions.login());
          history("/todo");
        }
        else {
          toast.error("User data or id not found in the response.");
        }
      }
    } catch (error) {
      console.error("Error occurred while signing in:", error);
    }
  };

  return (
    <div>
      <div className="signup">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center">
              <HeadingComp first="Sign" second="In" />
            </div>
            <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
              <div className="d-flex flex-column  w-100 p-3">

                <input
                  className="p-2  my-3 input-signup"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={Inputs.email}
                  onChange={change}
                />

                <input
                  className="p-2 my-3 input-signup"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={Inputs.password}
                  onChange={change}
                />

                <button className="btn-signup p-2" onClick={submit}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;