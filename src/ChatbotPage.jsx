import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ChatbotPage.css';
import { chatbotResponses } from './faqData';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize chat with a greeting
  useEffect(() => {
    const randomGreeting = chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
    setMessages([{
      id: 1,
      text: randomGreeting,
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, []);

  // Auto scroll to bottom of chat
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBack = () => {
    navigate('/faq');
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const findBestMatch = (userInput) => {
    const userInputLower = userInput.toLowerCase();
    
    // Check for exact matches in our response dictionary
    for (const [key, value] of Object.entries(chatbotResponses)) {
      if (key !== 'greeting' && key !== 'farewell' && key !== 'default') {
        if (userInputLower.includes(key)) {
          return value;
        }
      }
    }
    
    // Check FAQ data for similar questions
    const allFaqData = [
      ...Object.values(require('./faqData').faqData.account),
      ...Object.values(require('./faqData').faqData.payment),
      ...Object.values(require('./faqData').faqData.bookings),
    ];
    
    for (const item of allFaqData) {
      const questionLower = item.question.toLowerCase();
      if (
        userInputLower.includes(questionLower) || 
        questionLower.includes(userInputLower)
      ) {
        return item.answer;
      }
    }
    
    // If no match found, return a default response
    return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: findBestMatch(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chatbot-page">
      <div className="chat-header">
        <Link to="/faq" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <div className="chat-title">
          <h1>Support Chat</h1>
          <div className="online-status">
            <div className="status-dot"></div>
            <span>Online</span>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message-container ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {message.sender === 'bot' && (
              <div className="bot-avatar">
                <i className="fas fa-headset"></i>
              </div>
            )}
            <div className="message-bubble">
              <div className="message-text">{message.text}</div>
              <div className="message-time">{formatTimestamp(message.timestamp)}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-container bot-message">
            <div className="bot-avatar">
              <i className="fas fa-headset"></i>
            </div>
            <div className="message-bubble typing-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="send-button"
          onClick={handleSendMessage}
          disabled={inputMessage.trim() === ''}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage; 