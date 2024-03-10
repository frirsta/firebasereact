import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardFooter,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Context/Context";
import { auth, onAuthStateChanged } from "../../firebase/firebase";
import { useFormik } from "formik";
import google from "../../assets/images/google.png";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { registerWithEmailAndPassword, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .min("6", "Username is too short, must be at least 6 characters")
      .matches(/^[a-zA-Z]+$/, "Username must be alphabetic"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("Required")
      .min("8", "Password is too short, must be at least 8 characters")
      .matches(/^[a-zA-Z]+$/, "Password must be alphabetic"),
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = formik.values;
    if (formik.isValid === true) {
      registerWithEmailAndPassword(name, email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Please fill in all fields");
    }
  };
  const formik = useFormik({ initialValues, validationSchema, handleSubmit });
  return (
    <>
      <>
        {loading ? (
          <div className="flex flex-col justify-center justify-items-center items-center h-screen">
            loading
          </div>
        ) : (
          <div className="flex flex-col justify-center justify-items-center items-center h-screen">
            <Card
              color="transparent"
              shadow={false}
              className="w-100 flex flex-col justify-center items-center gap-3"
            >
              <CardHeader
                shadow={false}
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="blue-gray">
                  Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Welcome! Enter your details to register.
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col justify-center items-center gap-3">
                <form
                  onSubmit={handleSubmit}
                  className=" mb-2 w-70 max-w-screen-lg sm:w-96"
                >
                  <div className="mb-1 flex flex-col gap-4">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Your Name
                    </Typography>
                    <Input
                      name="name"
                      type="name"
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      {...formik.getFieldProps("name")}
                    />
                    <div>
                      {formik.touched.email && formik.errors.email && (
                        <Typography color="red" className="text-sm">
                          {formik.errors.email}
                        </Typography>
                      )}
                    </div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Your Email
                    </Typography>
                    <Input
                      name="email"
                      type="email"
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      {...formik.getFieldProps("email")}
                    />
                    <div>
                      {formik.touched.email && formik.errors.email && (
                        <Typography color="red" className="text-sm">
                          {formik.errors.email}
                        </Typography>
                      )}
                    </div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Password
                    </Typography>
                    <Input
                      name="password"
                      type="password"
                      size="lg"
                      placeholder="********"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      {...formik.getFieldProps("password")}
                    />
                  </div>
                  <div>
                    {formik.errors.password && formik.touched.password && (
                      <Typography color="red" className="text-sm">
                        {formik.errors.password}
                      </Typography>
                    )}
                  </div>
                  <div>
                    <Checkbox
                      label={
                        <Typography
                          variant="small"
                          color="gray"
                          className="flex items-center"
                        >
                          I agree the&nbsp;
                          <a
                            href="#"
                            className="font-bold transition-colors hover:text-gray-900 underline"
                          >
                            Terms and Conditions
                          </a>
                        </Typography>
                      }
                      containerProps={{ className: "-ml-2.5" }}
                    />
                  </div>
                  <Button
                    size="lg"
                    type="submit"
                    className="flex justify-center items-center gap-3 mt-4"
                    fullWidth
                  >
                    Sign in
                  </Button>
                  <Button
                    size="lg"
                    color="white"
                    className="flex justify-center items-center gap-3 mt-4"
                    onClick={signInWithGoogle}
                    fullWidth
                  >
                    <div className="h-5 w-5">
                      <img src={google} alt="google" />
                    </div>
                    Sign up with google
                  </Button>
                </form>
              </CardBody>
              <CardFooter className="pt-0">
                <Typography
                  color="gray"
                  variant="small"
                  className="mt-1 flex justify-center gap-1"
                >
                  Already have an account?{" "}
                  <Link to={"/signin"} className="font-bold text-gray-900">
                    Sign In
                  </Link>
                </Typography>
              </CardFooter>
            </Card>
          </div>
        )}
      </>
    </>
  );
};

export default SignUp;
