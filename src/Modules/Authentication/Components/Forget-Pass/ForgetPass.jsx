import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosInstance, userUrl } from "../../../../Services/Url";
export default function ForgetPass() {
  let navigate = useNavigate();
  let {
    register,
    formState: { errors, isValid, isDirty, isSubmitting },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  async function onSubmit(value) {
    console.log(value);
    try {
      let { data } = await axiosInstance.post(userUrl.forgetPassword, value);
      toast.success(data.message, { position: "top-center" });
      navigate("/reset-Password", { state: { email: value.email } });
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  }

  return (
    <>
      <div className="content">
        <h4 style={{ color: "#494949 " }}>Forgot Your Password?</h4>
        <p className="text-muted">
          No worries! Please enter your email and we will send a password reset
          link
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-5 ">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-envelope"></i>
          </span>
          <input
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
          <div className="text-danger mb-3">{errors.email.message}</div>
        )}

        <button
          className="btn  w-100 text-white"
          style={{ backgroundColor: "#4AA35A" }}
          disabled={!isValid || !isDirty || isSubmitting}
        >
          {isSubmitting ? <i className="fa-solid fa-spinner"></i> : "Submit"}
        </button>
      </form>
    </>
  );
}
