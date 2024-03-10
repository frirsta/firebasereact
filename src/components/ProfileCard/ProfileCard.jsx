import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import UserAvatar from "./UserAvatar";
export function ProfileCard({ name, image, status }) {
  return (
    <Card className="w-96">
      <CardHeader floated={false} className="h-80">
        <UserAvatar image={image} name={name} />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {name}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <p
            className={`${
              status === "Offline"
                ? "absolute bottom-4 right-4 text-sm font-medium text-red-600 no-underline leading-none"
                : "absolute bottom-4 right-4 text-sm font-medium text-green-600 no-underline leading-none"
            }`}
          >
            {status}
          </p>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
