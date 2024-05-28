import React, { useState, useEffect, useRef } from 'react';
import './RightSidebar.css';
import aiAvatar from '../assets/ai-avatar.png';  // Adjust the path if necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCheck } from '@fortawesome/free-solid-svg-icons';

const RightSidebar = () => {
  const [aiSettings, setAiSettings] = useState({
    gender: 'male',
    formality: 'formal',
    age: 'adult',
  });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const dropdownRef = useRef(null);

  const handleChange = (name, value) => {
    setAiSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: newMessage },
      ]);
      setNewMessage('');
      // Simulate AI response (for demonstration purposes)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'ai', text: 'This is an AI response.' },
        ]);
      }, 1000);
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const getCheckmark = (currentValue, value) => {
    return currentValue === value ? <FontAwesomeIcon icon={faCheck} className="checkmark" /> : null;
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowSettings(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="right-sidebar">
      <div className="ai-avatar-settings" ref={dropdownRef}>
        <div className="avatar-header">
          <h2>AI Avatar</h2>
          <FontAwesomeIcon icon={faCog} onClick={toggleSettings} className="settings-icon" />
        </div>
        <img src={aiAvatar} alt="AI Avatar" className="ai-avatar-image" />
        <div className={`settings-dropdown ${showSettings ? 'show' : ''}`}>
          <div className="menu-item">
            Gender
            <div className="submenu">
              <div className="menu-item" onClick={() => handleChange('gender', 'male')}>
                Male {getCheckmark(aiSettings.gender, 'male')}
              </div>
              <div className="menu-item" onClick={() => handleChange('gender', 'female')}>
                Female {getCheckmark(aiSettings.gender, 'female')}
              </div>
              <div className="menu-item" onClick={() => handleChange('gender', 'other')}>
                Other {getCheckmark(aiSettings.gender, 'other')}
              </div>
            </div>
          </div>
          <div className="menu-item">
            Age
            <div className="submenu">
              <div className="menu-item" onClick={() => handleChange('age', 'child')}>
                Child {getCheckmark(aiSettings.age, 'child')}
              </div>
              <div className="menu-item" onClick={() => handleChange('age', 'teen')}>
                Teen {getCheckmark(aiSettings.age, 'teen')}
              </div>
              <div className="menu-item" onClick={() => handleChange('age', 'adult')}>
                Adult {getCheckmark(aiSettings.age, 'adult')}
              </div>
              <div className="menu-item" onClick={() => handleChange('age', 'elder')}>
                Elder {getCheckmark(aiSettings.age, 'elder')}
              </div>
            </div>
          </div>
          <div className="menu-item">
            Formality
            <div className="submenu">
              <div className="menu-item" onClick={() => handleChange('formality', 'formal')}>
                Formal {getCheckmark(aiSettings.formality, 'formal')}
              </div>
              <div className="menu-item" onClick={() => handleChange('formality', 'informal')}>
                Informal {getCheckmark(aiSettings.formality, 'informal')}
              </div>
              <div className="menu-item" onClick={() => handleChange('formality', 'slang')}>
                Slang {getCheckmark(aiSettings.formality, 'slang')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-container">
        <h2>Chat</h2>
        <div className="chat-window">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="chat-form">
          <input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default RightSidebar;
