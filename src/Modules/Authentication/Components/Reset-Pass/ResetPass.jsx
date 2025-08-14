import React from "react";
import logo from "../../../../assets/Images/44.svg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
export default function ResetPass() {
  const location = useLocation();
  const email = location.state?.email || "";
  let navigate = useNavigate();
  let {
    register,
    formState: { errors, isDirty, isValid, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm({ mode: "onChange" });

  let onSubmit = async (value) => {
    try {
      let { data } = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        value
      );
      toast.success(data.message, { position: "top-center" });
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  return (
    <>
      <section className="auth-container vh-100 d-flex justify-justify-content-center align-items-center">
        <div className="container-fluid ">
          <div className="row   ">
            <div className="col-md-6 mx-auto ">
              <div className="bg-white px-5 py-4 rounded-3 ">
                <div className="logo text-center mb-3">
                  {" "}
                  <img className="w-50" src={logo} alt="login logo" />
                </div>
                <div className="content">
                  <h4 style={{ color: "#494949 " }}> Reset Password</h4>
                  <p className="text-muted">
                    Please Enter Your Otp or Check Your Inbox
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3 ">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      {...register("email")}
                      disabled
                      value={email}
                      type="email"
                      className="form-control "
                      placeholder="Enter your E-mail"
                      aria-label="email"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.email && (
                    <div className="text-danger mb-3">
                      {errors.email.message}
                    </div>
                  )}

                  <div className="input-group mb-3 ">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      {...register("seed", {
                        required: "otp is required",
                      })}
                      autoComplete="one-time-code"
                      type="text"
                      className="form-control "
                      placeholder="OTP"
                      aria-label="otp"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.seed && (
                    <div className="text-danger mb-3">
                      {errors.seed.message}
                    </div>
                  )}
                  <div className="input-group mb-3 ">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      {...register("password", {
                        required: "password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}\[\]:;"\\|,.<>\/?]).{6,}$/,
                          message:
                            "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long.",
                        },
                      })}
                      type="password"
                      className="form-control "
                      placeholder="New Password"
                      aria-label="password"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.password && (
                    <div className="text-danger mb-3">
                      {errors.password.message}
                    </div>
                  )}
                  <div className="input-group mb-3 ">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      {...register("confirmPassword", {
                        required: "confirm password is required",
                        validate: (value) =>
                          value === getValues("password") ||
                          "Passwords do not match",
                      })}
                      type="password"
                      className="form-control "
                      placeholder="Confirm New Password"
                      aria-label="confirmPassword"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="text-danger mb-3">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                  <button
                    className="btn  w-100 text-white"
                    style={{ backgroundColor: "#4AA35A" }}
                    disabled={!isDirty || !isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <i className="fa-solid fa-spinner"></i>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
