import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import chatbotLogo from "../assets/seacomlogo.png";
import CodeMessage from "../components/CodeMessage";

const LifeSeacom = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const msgEnd = useRef();
  const apiKey = import.meta.env.VITE_GPT_API_KEY;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    msgEnd.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const sendMessage = async () => {
    try {
      const userMessage = userInput.trim();
      if (userMessage === "") {
        return null;
      }

      const newUserMessage = { role: "user", content: userMessage };
      setChatHistory((prevChatHistory) => [...prevChatHistory, newUserMessage]);
      setUserInput("");
      setIsLoading(true);

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            newUserMessage,
          ],
          model: "gpt-3.5-turbo-1106",
          max_tokens: 256,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const chatbotResponse = response.data.choices[0].message.content;
      const newChatbotResponse = { role: "chatbot", content: chatbotResponse };
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        newChatbotResponse,
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error("API Request Error:", error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className='bg-slate-900 min-h-[40vh] lg:min-h-[90vh] w-full px-4'>
      <div ref={msgEnd} className='mb-4'></div>
      <div className='chat-container lg:w-[60%] w-full mx-auto pt-16 lg:px-0  flex flex-col gap-4 pb-16 lg:pb-0 border-t-4 border-blue-600 h-full'>
        <div className='flex items-center justify-center space-x-2 py-2 rounded-xl bg-white mx-4'>
          <img src={chatbotLogo} alt='logo' className='w-10' />
          <h1 className='text-4xl font-bold text-center'>SEACOM AI</h1>
        </div>
        <p className='text-center text-xl mb-10 text-green-700 mx-4'>
          Seacom AI that provides information about sciences and engineering.
        </p>

        {chatHistory.map((message, index) => (
          <div key={index} className={`chat ${message.role}`}>
            {message.role === "chatbot" && message.content.startsWith("```") ? (
              <CodeMessage content={message.content} />
            ) : (
              <div
                className={`chat-bubble ${
                  message.role === "chatbot"
                    ? "response-bubble shadow-xl"
                    : "text-black font-medium shadow-lg"
                }`}
              >
                {message.role === "chatbot" && (
                  <div className='max-w-fit rounded-full shadow-2xl flex items-center gap-2 p-1'>
                    <img
                      src={chatbotLogo}
                      alt='logo'
                      className='w-10 h-10 self-center shadow-2xl brightness-70'
                    />
                  </div>
                )}
                <div
                  className={
                    message.role === "chatbot"
                      ? "bg-black text-white rounded-lg px-3 py-2 mt-2"
                      : null
                  }
                >
                  {message.content}
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className='chat chatbot'>
            <div className='chat-bubble response-bubble shadow-xl'>
              <div className=' max-w-fit rounded-full shadow-2xl flex items-center gap-2 p-1'>
                <img
                  src={chatbotLogo}
                  alt='logo'
                  className='w-10 h-10 self-center shadow-2xl'
                />
              </div>
              <div className='loading-animation w-10 h-10 border-t-4 border-blue-600 rounded-full border-solid animate-spin m-2'></div>
            </div>
          </div>
        )}

        <div className='chat user '>
          <input
            type='text'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className='p-2 border w-full py-4 rounded-md'
            placeholder='Type your question...'
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={sendMessage}
            className='bg-blue-600 text-white py-4 px-6 rounded-lg'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LifeSeacom;
