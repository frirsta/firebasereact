import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardFooter,
} from "@material-tailwind/react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Context/Context";
import { auth, onAuthStateChanged } from "../../firebase/firebase";
import { useFormik } from "formik";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { registerWithEmailAndPassword } = useContext(AuthContext);
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
    console.log(formik.values);
  };
  const formik = useFormik({ initialValues, validationSchema, handleSubmit });
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          {" "}
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Welcome! Enter your details to register.
            </Typography>
            <form
              onSubmit={handleSubmit}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Name
                </Typography>
                <Input
                  name="name"
                  type="text"
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...formik.getFieldProps("name")}
                />
                <div>
                  {formik.touched.name && formik.errors.name && (
                    <Typography color="red" className="text-sm">
                      {formik.errors.name}
                    </Typography>
                  )}
                </div>
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
                  placeholder="Enter your password"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...formik.getFieldProps("password")}
                />
                <div>
                  {formik.touched.password && formik.errors.password && (
                    <Typography color="red" className="text-sm">
                      {formik.errors.password}
                    </Typography>
                  )}
                </div>
              </div>
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree the
                    <Link
                      to={"/"}
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </Link>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
              <Button type="submit" className="mt-6" fullWidth>
                sign up
              </Button>
            </form>
            <CardFooter>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link to={"/signin"} className="font-medium text-gray-900">
                  Sign In
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      )}{" "}
    </>
  );
};

export default SignUp;
