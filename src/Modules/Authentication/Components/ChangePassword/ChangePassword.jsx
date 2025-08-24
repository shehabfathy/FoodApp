import logo from "../../../../assets/Images/44.svg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance, userUrl } from "../../../../Services/Url";
import { useState } from "react";

export default function ChangePassword() {
  let navigate = useNavigate();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  let {
    register,
    formState: { errors, isDirty, isValid, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm({ mode: "onChange" });

  let onSubmit = async (value) => {
    try {
      let { data } = await axiosInstance.put(userUrl.changePassword, value);
      toast.success(data.message, { position: "top-center" });
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  return (
    <>
      <div className="logo text-center mb-2">
        <img className="w-50" src={logo} alt="login logo" />
      </div>
      <div className="content">
        <h4 style={{ color: "#494949 " }}> Change Your Password</h4>
        <p className="text-muted">Enter your details below</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-2 ">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            {...register("oldPassword", {
              required: "oldPassword is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}\[\]:;"\\|,.<>\/?]).{6,}$/,
                message:
                  "oldPassword must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long.",
              },
            })}
            type={showOld ? "text" : "password"}
            className="form-control "
            placeholder="Old Password"
            aria-label="oldPasswordd"
            aria-describedby="basic-addon1"
          />
          <span className="input-group-text">
            <i
              className={showOld ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
              onClick={() => setShowOld((prev) => !prev)}
            ></i>
          </span>
        </div>
        {errors.oldPassword && (
          <div className="text-danger mb-2">{errors.oldPassword.message}</div>
        )}
        <div className="input-group mb-2 ">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            {...register("newPassword", {
              required: "newPassword is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}\[\]:;"\\|,.<>\/?]).{6,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long.",
              },
            })}
            type={showNew ? "text" : "password"}
            className="form-control "
            placeholder="New Password"
            aria-label="newPassword"
            aria-describedby="basic-addon1"
          />
          <span className="input-group-text">
            <i
              className={showNew ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
              onClick={() => setShowNew((prev) => !prev)}
            ></i>
          </span>
        </div>
        {errors.newPassword && (
          <div className="text-danger mb-2">{errors.newPassword.message}</div>
        )}
        <div className="input-group mb-2 ">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            {...register("confirmNewPassword", {
              required: "confirm New Password is required",
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match",
            })}
            type={showConfirm ? "text" : "password"}
            className="form-control "
            placeholder="Confirm New Password"
            aria-label="confirmNewPassword"
            aria-describedby="basic-addon1"
          />
          <span className="input-group-text">
            <i
              className={
                showConfirm ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }
              onClick={() => setShowConfirm((prev) => !prev)}
            ></i>
          </span>
        </div>
        {errors.confirmNewPassword && (
          <div className="text-danger mb-2">
            {errors.confirmNewPassword.message}
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
            "Change Password"
          )}
        </button>
      </form>
    </>
  );
}
