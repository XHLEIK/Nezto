import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './FAQCategoryPage.css';
import { faqData } from './faqData';

const FAQCategoryPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  useEffect(() => {
    if (category && faqData[category]) {
      setQuestions(faqData[category]);
      // Initialize all questions as collapsed
      const initialState = {};
      faqData[category].forEach((q, index) => {
        initialState[index] = false;
      });
      setExpandedQuestions(initialState);
    }
  }, [category]);

  const handleBack = () => {
    navigate('/faq');
  };

  const toggleQuestion = (index) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'account':
        return <i className="fas fa-user"></i>;
      case 'payment':
        return <i className="fas fa-hand-holding-usd"></i>;
      case 'bookings':
        return <i className="fas fa-box"></i>;
      default:
        return <i className="fas fa-question"></i>;
    }
  };

  return (
    <div className="faq-category-page">
      <div className="faq-category-header">
        <Link to="/faq" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h1 className="header-title">{category}</h1>
      </div>

      <div className="category-banner">
        <div className={`category-icon ${category}-icon`}>
          {getCategoryIcon()}
        </div>
        <h2 className="category-title">
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category'} Questions
        </h2>
      </div>

      <div className="faq-questions">
        {questions.length > 0 ? (
          questions.map((item, index) => (
            <div className="faq-question-item" key={index}>
              <div 
                className="question-header" 
                onClick={() => toggleQuestion(index)}
              >
                <h3 className="question-text">{item.question}</h3>
                <span className="toggle-icon">
                  {expandedQuestions[index] ? 
                    <i className="fas fa-minus"></i> : 
                    <i className="fas fa-plus"></i>}
                </span>
              </div>
              {expandedQuestions[index] && (
                <div className="question-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-questions">
            <p>No questions available for this category.</p>
          </div>
        )}
      </div>

      <div className="chat-button-container">
        <button 
          className="start-chat-button"
          onClick={() => navigate('/faq/chat')}
        >
          Ask a question
        </button>
      </div>
    </div>
  );
};

export default FAQCategoryPage; 