import React from "react";

const StudentChat = () => {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const [room1, setRoom1] = useState("");
  const [room2, setRoom2] = useState("");
  const [receiverRegistrationNumber, setReceiverRegistrationNumber] =
    useState("");
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const [olderMessages, setOlderMessages] = useState([]);
  const ENDPOINT = "https://apna-erp.herokuapp.com";

  useEffect(() => {
    let temp = props.match.params.room;
    socket = io(ENDPOINT);
    let tempArr = temp.split(".");
    setReceiverRegistrationNumber(tempArr[0]);
    setRoom1(temp);
    swap(tempArr, 0, 1);
    let tempRoom2 = tempArr[0] + "." + tempArr[1];
    setRoom2(tempRoom2);
  }, [ENDPOINT, props.match.params.room]);

  useEffect(() => {
    dispatch(getPrivateConversation(room1));
    dispatch(getPrivateConversation2(room2));
    socket = io(ENDPOINT);
    socket.emit("join room", {
      room1,
      room2,
    });
    socket.on("new Message", (data) => {
      setMessageArray([...messageArray, data]);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [room1, room2]);

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
      alert("Can't send empty message");
    }
  };

  useEffect(() => {
    socket.on("new Message", (data) => {
      setOlderMessages(store.student.privateChat);
      setMessageArray([...messageArray, data]);
    });
  }, [messageArray, olderMessages]);

  return (
    <div>
      {store.student.isAuthenticated ? (
        <>
          <HomeHelper />
          <div className='container mx-auto p-4'>
            <div className='flex'>
              <div className='w-1/2'>
                <form className='flex items-center' onSubmit={formHandler}>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Type here..'
                    className='resize-none w-full border rounded py-2 px-3'
                  />
                  <button
                    type='submit'
                    className='bg-blue-500 text-white ml-2 py-2 px-4 rounded'
                  >
                    Send
                  </button>
                </form>
              </div>
              <div className='w-1/2'>{/* ... your existing code */}</div>
            </div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default StudentChat;
