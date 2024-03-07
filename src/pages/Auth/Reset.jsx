import React, { useState } from "react";
import { Button, Card, Input, Typography } from "@material-tailwind/react";

const Reset = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="grid grid-cols-1 justify-items-center items-center h-screen">
      <Card color="transparent">
        <Typography color="blue" size="lg" type="submit" className="mt-4">
          Enter the email address associated with your account and we'll send
          you a link to reset your password
        </Typography>
        <Input
          name="email"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        />
        <Button color="blue" size="lg" type="submit" className="mt-4">
          Continue
        </Button>
      </Card>
    </div>
  );
};

export default Reset;
