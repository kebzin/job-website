import ReactTimeago from "react-timeago";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";

import { Separator } from "../../ui/separator";

const MessageContainer = ({ notification }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Notifications</CardTitle>
        <CardDescription>
          Ths are the Notification you recived so fare{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input value="http://example.com/link/to/document" readOnly />
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">People with access</h4>
          <div className="grid gap-6">
            {notification?.map((element, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="flex items-center justify-between space-x-4 hover:bg-secondary-500/25 py-4 px-4  rounded-md cursor-pointer"
                  >
                    <div className="flex  space-x-4">
                      <Avatar>
                        <AvatarImage src="/avatars/03.png" />
                        <AvatarFallback>
                          {element?.senderId?.FirstName.charAt(0) +
                            element?.senderId?.LastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          From :{" "}
                          {element.senderId?.FirstName +
                            " " +
                            element?.senderId?.LastName}
                        </p>
                        <CardDescription>{element?.title}</CardDescription>
                      </div>
                    </div>
                    <p>{"2 days ago"}</p>
                  </div>
                  <Separator className="" />
                </>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageContainer;
