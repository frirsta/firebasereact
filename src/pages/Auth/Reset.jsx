import React, { useContext, useState } from "react";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { AuthContext } from "../../components/Context/Context";
import { useFormik } from "formik";
const Reset = () => {
  const [loading, setLoading] = useState(false);
  const { sendPasswordResetEmail } = useContext(AuthContext);
  const initialValues = { email: "" };
  const formik = useFormik({ initialValues });
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
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <Card color="transparent">
            <Typography color="blue" size="lg" type="submit" className="mt-4">
              Enter the email address associated with your account and we'll
              send you a link to reset your password
            </Typography>
            <Input
              name="email"
              type="email"
              label="Email"
              {...formik.getFieldProps("email")}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            />
            <Button
              onClick={handleReset}
              color="blue"
              size="lg"
              type="submit"
              className="mt-4"
            >
              Continue
            </Button>
          </Card>
        </div>
      )}
    </>
  );
};

export default Reset;
