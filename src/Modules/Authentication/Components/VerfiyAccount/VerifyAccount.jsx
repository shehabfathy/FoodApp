import React from "react";
import logo from "../../../../assets/Images/44.svg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosInstance, userUrl } from "../../../../Services/Url";

export default function VerifyAccount() {
  let navigate = useNavigate();
  let {
    register,
    formState: { errors, isDirty, isValid, isSubmitting },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  let onSubmit = async (value) => {
    try {
      let { data } = await axiosInstance.put(userUrl.verify, value);
      toast.success(data.message, { position: "top-center" });
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message, { position: "top-center" });
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
                  <h4 style={{ color: "#494949 " }}> Verify Account</h4>
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
                      {...register("email", {
                        required: "email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email address",
                        },
                      })}
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
                      {...register("code", {
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
                  <button
                    className="btn  w-100 text-white"
                    style={{ backgroundColor: "#4AA35A" }}
                    disabled={!isDirty || !isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <i className="fa-solid fa-spinner"></i>
                    ) : (
                      "Send"
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
