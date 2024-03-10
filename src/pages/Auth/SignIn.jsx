import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { Card, Input, Typography, Checkbox } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Context/Context";
import { auth, onAuthStateChanged } from "../../firebase/firebase";
import google from "../../assets/images/google.png";
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, loginWithEmailAndPassword } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        navigate("/signin");
        setLoading(false);
      }
    });
  }, [navigate]);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("Required")
      .min("6", "Password is too short, must be at least 6 characters")
      .matches(/^[a-zA-Z]+$/, "Password must be alphabetic"),
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formik.values;
    if (formik.isValid === true) {
      loginWithEmailAndPassword(email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Please fill in all fields");
    }
    console.log(formik.values);
  };
  const formik = useFormik({ initialValues, validationSchema, handleSubmit });
  return (
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
            className="w-100 flex flex-col justify-center ite"
          >
            <CardHeader
              shadow={false}
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="blue-gray">
                Sign In
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Welcome! Sign in to your account
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col justify-center items-center gap-3">
              <form
                onSubmit={handleSubmit}
                className=" mb-2 w-70 max-w-screen-lg sm:w-96"
              >
                <div className="mb-1 flex flex-col gap-4">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
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
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
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
                  <Typography
                    color="gray"
                    className="mt-8 font-bold text-sm text-right mr-3"
                  >
                    <Link
                      to={"/reset"}
                      className="mt-1 font-bold text-gray-800"
                    >
                      Forget password?
                    </Link>
                  </Typography>
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
                  Sign in with google
                </Button>
              </form>
            </CardBody>
            <CardFooter className="pt-0">
              <Typography
                color="gray"
                variant="small"
                className="mt-1 flex justify-center gap-1"
              >
                Don't have an account?{" "}
                <Link to={"/signup"} className="font-bold text-gray-900">
                  Sign Up
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default SignIn;
