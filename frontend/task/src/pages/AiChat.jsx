import React, { useState, useRef, useEffect } from "react";

const AIChat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate AI response (replace this with real API call later)
  const getBotResponse = (userMessage) => {
    return `You said: "${userMessage}". (This is a demo response.)`;
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { sender: "user", text: input }]);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: getBotResponse(input) },
      ]);
    }, 800);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">AI Chat</h1>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl p-4 shadow-md mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-xl max-w-xs break-words ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
