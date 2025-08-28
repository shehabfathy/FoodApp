import logo from "../../../../assets/Images/44.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { axiosInstance, userUrl } from "../../../../Services/Url";

export default function Login() {
  let navigate = useNavigate();
  let [Loading, setLoading] = useState(false);
  let inputElement = useRef();
  let {
    register,
    formState: { errors, isValid, isSubmitting, isDirty },
    handleSubmit,
    getValues,
  } = useForm({ mode: "onChange" });

  async function onSubmit(value) {
    console.log(value);
    try {
      let { data } = await axiosInstance.post(userUrl.register, value);
      setLoading(true);
      toast.success(data.message);
      navigate("/verifyAccount");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  let showPassword = () => {
    if (inputElement.current.type == "password") {
      inputElement.current.type = "text";
    } else {
      inputElement.current.type = "password";
    }
  };

  return (
    <>
      <div className="content">
        <h4 style={{ color: "#494949 " }}>Register</h4>
        <p className="text-muted">Welcome Back! Please enter your details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-between align-items-center gap-5 ">
          <div className="w-50">
            <div className="input-group mb-3 ">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-mobile-screen"></i>
              </span>
              <input
                {...register("userName", {
                  required: "userName is required",
                  pattern: {
                    value: /^[A-Za-z0-9]{7,8}$/,
                    message:
                      " must include letters and digits not more 8 character",
                  },
                })}
                type="text"
                className="form-control  "
                placeholder="UserName"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.userName && (
              <div className="text-danger mb-3">{errors.userName.message}</div>
            )}

            <div className="input-group mb-3 ">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-flag"></i>
              </span>
              <input
                {...register("country", {
                  required: "Country is required",
                  pattern: {
                    value: /^[A-Za-z ]{2,50}$/,
                    message:
                      "Please enter a valid country name (letters only).",
                  },
                })}
                type="text"
                className="form-control  "
                placeholder="country"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.country && (
              <div className="text-danger mb-3">{errors.country.message}</div>
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
                ref={(e) => {
                  register("password").ref(e);
                  inputElement.current = e;
                }}
                type="password"
                className="form-control  "
                autoComplete="new-password"
                placeholder="Password"
                aria-label="password"
                aria-describedby="basic-addon1"
              />
              <span className="input-group-text">
                {" "}
                <i
                  onClick={() => showPassword()}
                  className="fa-solid fa-eye "
                ></i>
              </span>
            </div>
            {errors.password && (
              <div className="text-danger mb-3">{errors.password.message}</div>
            )}
          </div>

          <div className="w-50">
            <div className="input-group mb-3 ">
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

            <div className="input-group mb-3 ">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-mobile-screen"></i>
              </span>
              <input
                {...register("phoneNumber", {
                  required: "phoneNumber is required",
                  pattern: {
                    value: /^01[1205][0-9]{8}$/,
                    message: "Please enter a valid phone Number.",
                  },
                })}
                type="tel"
                className="form-control  "
                placeholder="phoneNumber"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.phoneNumber && (
              <div className="text-danger mb-3">
                {errors.phoneNumber.message}
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
                    value === getValues("password") || "Passwords do not match",
                })}
                type="password"
                className="form-control "
                placeholder="Confirm New Password"
                aria-label="confirmPassword"
                aria-describedby="basic-addon1"
              />
              <span className="input-group-text" id="basic-addon1">
                <i
                  onClick={() => showPassword()}
                  className="fa-solid fa-eye "
                ></i>
              </span>
            </div>
            {errors.confirmPassword && (
              <div className="text-danger mb-3">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
        </div>

        <div className="links   mb-4 text-end">
          <Link
            style={{ color: "#4AA35A" }}
            to="/login"
            className=" text-decoration-none "
          >
            Login Now?
          </Link>
        </div>
        <button
          className="btn  w-75 d-block mx-auto text-white"
          style={{ backgroundColor: "#4AA35A" }}
          disabled={!isValid || !isDirty || isSubmitting}
        >
          {isSubmitting ? <i className="fa-solid fa-spinner"></i> : "Register"}
        </button>
      </form>
    </>
  );
}
