// import React, { useState, useRef, useEffect } from "react";

// const AIChat = () => {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hello! How can I help you today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom whenever messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Simulate AI response (replace this with real API call later)
//   const getBotResponse = (userMessage) => {
//     return `You said: "${userMessage}". (This is a demo response.)`;
//   };

//   const sendMessage = () => {
//     if (!input.trim()) return;

//     // Add user message
//     setMessages([...messages, { sender: "user", text: input }]);
    
//     // Simulate bot response after a delay
//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: getBotResponse(input) },
//       ]);
//     }, 800);

//     setInput("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">AI Chat</h1>

//       {/* Chat Box */}
//       <div className="flex-1 overflow-y-auto bg-white rounded-xl p-4 shadow-md mb-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex mb-3 ${
//               msg.sender === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`p-3 rounded-xl max-w-xs break-words ${
//                 msg.sender === "user"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Box */}
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AIChat;
// import React, { useState, useRef, useEffect } from "react";

// const AIChat = () => {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hello! How can I help you today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Call OpenAI API
//   const getBotResponse = async (userMessage) => {
//     try {
//       setLoading(true);

//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer YOUR_OPENAI_API_KEY_HERE`, // ⚠️ Replace this securely later
//         },
//         body: JSON.stringify({
//           model: "gpt-4o-mini",
//           messages: [
//             { role: "system", content: "You are a helpful AI assistant." },
//             { role: "user", content: userMessage },
//           ],
//         }),
//       });

//       const data = await response.json();
//       const botMessage = data.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";
//       return botMessage;
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//       return "Oops! Something went wrong. Try again.";
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     // Add user message
//     setMessages((prev) => [...prev, { sender: "user", text: input }]);
//     const userText = input;
//     setInput("");

//     // Get AI response
//     const botReply = await getBotResponse(userText);
//     setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">AI Chat</h1>

//       {/* Chat Box */}
//       <div className="flex-1 overflow-y-auto bg-white rounded-xl p-4 shadow-md mb-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex mb-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`p-3 rounded-xl max-w-xs break-words ${
//                 msg.sender === "user"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {loading && (
//           <div className="text-gray-500 italic text-sm">AI is thinking...</div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Box */}
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
//           disabled={loading}
//         >
//           {loading ? "..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AIChat;
import React, { useState, useRef, useEffect } from "react";

// --- Gemini API Configuration ---
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";
const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Utility function to handle API call with exponential backoff
const fetchWithRetry = async (apiUrl, options, maxRetries = 5) => {
    let lastError = null;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch(apiUrl, options);
            if (!response.ok) {
                // If response is not 2xx, throw an error to trigger retry or final catch
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
            }
            return response;
        } catch (error) {
            lastError = error;
            // Calculate delay: 2^attempt * 1000ms
            const delay = Math.pow(2, attempt) * 1000;
            if (attempt < maxRetries - 1) {
                // Only delay if it's not the last attempt
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    throw new Error(`Failed to fetch after ${maxRetries} attempts. Last error: ${lastError.message}`);
};

const App = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am Gemini. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Call Gemini API
  const getBotResponse = async (userMessage) => {
    // IMPORTANT: The apiKey is left as an empty string.
    // In the Canvas environment, the platform automatically injects the key during the fetch call.
    // For local testing, you would temporarily set the key here (e.g., const apiKey = "AIza...")
    const apiKey = ""; 
    const apiUrl = `${API_URL_BASE}?key=AIzaSyDXL9b6aprJ0mbWfPE2XJhdWFY-PKih1nk`;

    try {
      setLoading(true);

      const payload = {
        // System instruction to guide the model's behavior
        systemInstruction: {
            parts: [{ text: "You are a friendly and helpful AI assistant named Gemini. Keep your responses concise and accurate." }]
        },
        // User content (the prompt)
        contents: [{ 
            role: "user", 
            parts: [{ text: userMessage }] 
        }],
      };
      
      const response = await fetchWithRetry(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      // Parse the response for the text content
      const botMessage = 
        data.candidates?.[0]?.content?.parts?.[0]?.text || 
        data.error?.message || 
        "Sorry, I didn't understand that. (Check console for API error.)";
        
      return botMessage;

    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      // Return a user-friendly error message
      return "Oops! Something went wrong with the connection. Try again.";
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    
    // 1. Add user message
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    // 2. Get AI response (This will update the loading state internally)
    const botReply = await getBotResponse(userText);
    
    // 3. Add bot message
    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) sendMessage();
  };

  // Chat message rendering component
  const ChatMessage = ({ msg }) => (
    <div
      className={`flex mb-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`p-3 rounded-xl max-w-xs break-words shadow-md transition-all duration-300 ${
          msg.sender === "user"
            ? "bg-blue-600 text-white rounded-tr-sm"
            : "bg-gray-100 text-gray-800 rounded-tl-sm"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 sm:p-8 font-sans">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        Gemini Chat Demo
      </h1>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl p-4 shadow-xl mb-4 flex flex-col space-y-3 max-h-[70vh]">
        {messages.map((msg, index) => (
          <ChatMessage key={index} msg={msg} />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-xl rounded-tl-sm text-gray-500 italic text-sm animate-pulse">
              Gemini is typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex gap-3 pt-2">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className="flex-1 p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150"
        />
        <button
          onClick={sendMessage}
          className={`px-6 py-4 rounded-xl font-semibold transition duration-150 shadow-lg 
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"}`}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
