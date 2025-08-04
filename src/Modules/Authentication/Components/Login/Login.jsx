import logo from "../../../../assets/Images/44.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
export default function Login({ getuser }) {
  let navigate = useNavigate();
  let {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  async function onSubmit(value) {
    console.log(value);
    try {
      let { data } = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/Users/Login`,
        value
      );
      toast.success(data.message, { position: "top-center" });
      localStorage.setItem("token", data.token);
      getuser();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  }

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
                  <h4 style={{ color: "#494949 " }}>Log In</h4>
                  <p className="text-muted">
                    Welcome Back! Please enter your details
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-2 ">
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
                      type="password"
                      className="form-control "
                      placeholder="Password"
                      aria-label="password"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.password && (
                    <div className="text-danger mb-3">
                      {errors.password.message}
                    </div>
                  )}
                  <div className="links d-flex justify-content-between align-items-center mb-4">
                    <Link
                      to="register"
                      className="text-black text-decoration-none "
                    >
                      Register Now?
                    </Link>
                    <Link
                      to="forgetPass"
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
                    Login
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
