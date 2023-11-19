import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendMessage,
  getPrivateConversation,
  getPrivateConversation2,
} from "../redux/action/studentAction";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function swap(input, value_1, value_2) {
  var temp = input[value_1];
  input[value_1] = input[value_2];
  input[value_2] = temp;
}

let socket;

const StudentChat = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [room1, setRoom1] = useState("");
  const [room2, setRoom2] = useState("");
  const [receiverRegistrationNumber, setReceiverRegistrationNumber] =
    useState("");
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const { room: roomParam } = useParams();
  const ENDPOINT = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    let temp = roomParam;
    socket = io(ENDPOINT);
    let tempArr = temp.split(".");
    setReceiverRegistrationNumber(tempArr[0]);
    setRoom1(temp);
    swap(tempArr, 0, 1);
    let tempRoom2 = tempArr[0] + "." + tempArr[1];
    setRoom2(tempRoom2);

    const fetchData = () => {
      dispatch(getPrivateConversation(room1));
      dispatch(getPrivateConversation2(room2));
    };

    fetchData();

    socket.emit("join room", {
      room1,
      room2,
    });
    socket.on("new Message", (data) => {
      setMessageArray((prevArray) => [...prevArray, data]);
    });

    const interval = setInterval(() => {
      fetchData();
      socket.on("new Message", (data) => {
        setMessageArray((prevArray) => [...prevArray, data]);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, roomParam, room1, room2, dispatch]);

  const formHandler = (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      socket.emit("private message", {
        sender: store.student.student.student.name,
        message,
        room: room1,
      });
      setMessage("");
      let messageObj = {
        roomId: room1,
        senderName: store.student.student.student.name,
        senderId: store.student.student.student._id,
        message,
        senderRegistrationNumber:
          store.student.student.student.registrationNumber,
        receiverRegistrationNumber,
      };
      dispatch(sendMessage(room1, messageObj));
    } else {
      toast.success("Can't send an empty message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formHandler(e);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div>
      {store.student.isAuthenticated ? (
        <div className='lg:container w-full mx-auto p-4'>
          <div className='flex flex-col-reverse justify-between min-h-[80vh] bg-slate-200 mb-3'>
            <div className='w-full'>
              <div className='chat-area'>
                {/* {messageArray &&
                  messageArray.map((message, index) => (
                    <div key={index} className='message'>
                      <strong>{message.sender}:</strong> {message.message}
                    </div>
                  ))} */}
              </div>
              <form className='flex items-center w-full' onSubmit={formHandler}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder='Type here..'
                  className='resize-none w-full border rounded py-2 px-3'
                />
                <button
                  type='submit'
                  className='bg-blue-500 text-white ml-2 py-5 px-5 rounded'
                >
                  Send
                </button>
              </form>
            </div>
            <div className='w-full lg:px-10 px-4 py-10 overflow-auto'>
              {store.student.privateChat?.map((obj, index) => (
                <div
                  key={index}
                  className='mb-4 flex flex-col gap-2 bg-white lg:w-1/3  p-3 rounded-md drop-shadow-lg'
                >
                  <div className='text-gray-600 flex items-center justify-between'>
                    <span className='font-bold text-blue-700 text-xl'>
                      {obj.senderName}
                    </span>
                    <span className='text-xs'>{formatDate(obj.createdAt)}</span>
                  </div>
                  <h1 className='text-lg'>{obj.message}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
};

export default StudentChat;
