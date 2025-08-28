import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { axiosInstance, userUrl } from "../../../../Services/Url";
import { AuthContext } from "../../../../Context/AuthContext";
import { Email_Validation } from "../../../../Services/Validation";

export default function Login() {
  let { getUser } = useContext(AuthContext);
  let [Loading, setLoading] = useState(false);
  let [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  let {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  async function onSubmit(value) {
    try {
      setLoading(true);
      let { data } = await axiosInstance.post(userUrl.login, value);
      localStorage.setItem("token", data?.token);
      getUser();
      navigate("/dashboard");
      toast.success("Welcome❤️");
    } catch (error) {
      toast.error("Login Failed", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="content">
        <h4 style={{ color: "#494949 " }}>Log In</h4>
        <p className="text-muted">Welcome Back! Please enter your details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-2 ">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-envelope"></i>
          </span>
          <input
            {...register("email", Email_Validation)}
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

        <div className="input-group mb-2 ">
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
            type={showPassword ? "text" : "password"}
            className="form-control  "
            autoComplete="new-password"
            placeholder="Password"
            aria-label="password"
            aria-describedby="basic-addon1"
          />
          <span className="input-group-text">
            {" "}
            <i
              onClick={() => setShowPassword((prev) => !prev)}
              className={
                showPassword ? "fa-solid fa-eye " : "fa-solid fa-eye-slash"
              }
            ></i>
          </span>
        </div>
        {errors.password && (
          <div className="text-danger mb-3">{errors.password.message}</div>
        )}
        <div className="links d-flex justify-content-between align-items-center mb-4">
          <Link to="/register" className="text-black text-decoration-none ">
            Register Now?
          </Link>
          <Link
            to="/forget-Password"
            className=" text-decoration-none"
            style={{ color: "#4AA35A" }}
          >
            Forgot Password?
          </Link>
        </div>
        <button
          className="btn  w-100 text-white"
          style={{ backgroundColor: "#4AA35A" }}
          disabled={!isValid || !isDirty}
        >
          {Loading ? <i className="fa-solid fa-spinner"></i> : "Login"}
        </button>
      </form>
    </>
  );
}
