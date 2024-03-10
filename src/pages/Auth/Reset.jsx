import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { AuthContext } from "../../components/Context/Context";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
const Reset = () => {
  const [loading, setLoading] = useState(false);
  const { sendPasswordResetEmail } = useContext(AuthContext);
  const initialValues = { email: "" };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
  });
  const handleReset = (event) => {
    event.preventDefault();
    const { email } = formik.values;
    if (formik.isValid === true) {
      sendPasswordResetEmail(email);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Please fill in all fields");
    }
    console.log(formik.values);
  };
  const formik = useFormik({ initialValues, validationSchema });
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="flex flex-col justify-center justify-items-center items-center h-screen">
          <Card
            color="transparent"
            shadow={false}
            className="w-100 flex flex-col justify-center items-center gap-3"
          >
            <CardHeader shadow={false} className="mb-4 grid place-items-center">
              <Typography
                variant="h3"
                color="blue-gray"
                className="text-center"
              >
                Reset Password
              </Typography>
              <Typography
                color="gray"
                className="mt-8 font-normal text-center mb-2 w-70 max-w-screen-lg sm:w-96"
              >
                Enter the email address associated with your account and we'll
                send you a link to reset your password
              </Typography>
            </CardHeader>

            <CardBody className="flex flex-col justify-center gap-3">
              <div className=" mb-2 w-70 max-w-screen-lg sm:w-96">
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  {...formik.getFieldProps("email")}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <div>
                  {formik.touched.email && formik.errors.email && (
                    <Typography color="red" className="text-sm">
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>
                <Button
                  onClick={handleReset}
                  size="lg"
                  type="submit"
                  className="flex justify-center items-center gap-3 mt-4"
                  fullWidth
                >
                  Continue
                </Button>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Typography color="blue-gray" className="text-center">
                <Link to="/signin" className="font-medium text-gray-900">
                  Return to sign in
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default Reset;
