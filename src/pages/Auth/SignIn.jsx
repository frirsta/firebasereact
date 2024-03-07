import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, CardFooter } from "@material-tailwind/react";
import { Card, Input, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Context/Context";
import { auth, onAuthStateChanged } from "../../firebase/firebase";

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
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          loading
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Welcome! Sign in to your account
            </Typography>
            <form
              onSubmit={handleSubmit}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-6">
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
              <Button color="blue" size="lg" type="submit" className="mt-4">
                Sign in
              </Button>
            </form>
            <CardFooter>
              <Button onClick={signInWithGoogle}>Sign in with google</Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Don't have an account?{" "}
                <Link to={"/signup"} className="font-medium text-gray-900">
                  Sign Up
                </Link>
              </Typography>
              <Typography color="gray" className="mt-4 text-center font-normal">
                <Link to={"/reset"} className="font-medium text-gray-900">
                  Forgotten your password?
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
