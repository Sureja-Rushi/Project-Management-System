import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchChatByProject, fetchChatMessages, sendMessage } from "@/redux/chat/Action";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatBox = () => {

    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {id} = useParams();
    const {auth, chat} = useSelector(store => store);

    useEffect(() => {
      dispatch(fetchChatByProject(id));
    }, []);

    useEffect(() => {
      dispatch(fetchChatMessages(id));
      console.log("messages");
    console.log(chat?.messages.content);
    }, []);

    const handleSendMessage = (e) => {
        dispatch(sendMessage({
          senderId: auth.user?.id,
          projectId: id,
          content: message,
        }))
        console.log("message ", message);
        setMessage("");
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }


  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[24rem] w-full py-5 px-3 flex gap-3 flex-col">
          {chat?.messages.map((message, index) =>
            message.sender.id !== auth.user.id ? (
              <div className="flex gap-2 mb-4 justify-start" key={message}>
                <Avatar>
                  <AvatarFallback>{message.sender.fullName[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 py-2 px-5 border rounded-es-2xl rounded-e-xl">
                  <p>{message.sender.fullName}</p>
                  <p className="text-gray-300 text-sm">{message.content}</p>
                  <p className="text-xs text-gray-400">{message.createdAt}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 mb-4 justify-end" key={message}>
                <div className="space-y-2 py-2 px-5 border rounded-ee-2xl rounded-s-xl">
                  <p>{message.sender.fullName}</p>
                  <p className="text-gray-300 text-sm">{message.content}</p>
                  <p className="text-xs text-gray-400">{message.createdAt}</p>
                </div>
                <Avatar>
                  <AvatarFallback>{message.sender.fullName[0]}</AvatarFallback>
                </Avatar>
              </div>
            )
          )}
        </ScrollArea>
        <div className="relative p-0">
          <Input
            placeHolder="type message..."
            className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
            value={message} onChange= {handleMessageChange}
          />
          <Button className="absolute right-2 top-3 rounded-full" onClick={handleSendMessage} size="icon" variant="ghost">
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
