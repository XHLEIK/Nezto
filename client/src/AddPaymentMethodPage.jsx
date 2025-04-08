import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddPaymentMethodPage.css';
import { useUser } from './UserContext';

// Define paths to local SVG images
const LOGO_PAYTM = "/images/paytm-logo-icon.svg";
const LOGO_MOBIKWIK = "/images/mobikwik-logo-icon.svg";
const LOGO_FREECHARGE = "/images/freecharge-logo-icon.svg";
const LOGO_GOOGLE_PAY = "/images/google-pay-primary-logo-logo-svgrepo-com.svg";
const LOGO_PHONEPE = "/images/phonepe-icon.svg";
const LOGO_BANK = "/images/bank-icon.svg";

const walletOptions = [
  { id: 'paytm', name: 'Paytm', icon: LOGO_PAYTM },
  { id: 'mobikwik', name: 'Mobikwik', icon: LOGO_MOBIKWIK },
  { id: 'freecharge', name: 'FreeCharge', icon: LOGO_FREECHARGE },
  { id: 'googlePay', name: 'Google Pay', icon: LOGO_GOOGLE_PAY },
  { id: 'phonePe', name: 'PhonePe', icon: LOGO_PHONEPE }
];

// List of common banks for netbanking
const bankOptions = [
  'HDFC Bank',
  'ICICI Bank',
  'State Bank of India',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Yes Bank',
  'Punjab National Bank',
  'Union Bank of India',
  'Bank of Baroda',
  'IndusInd Bank'
];

const AddPaymentMethodPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addPaymentMethod } = useUser();
  
  // Get payment type from navigation state, default to 'card'
  const initialType = location.state?.type || 'card';
  
  // State for form fields
  const [paymentType, setPaymentType] = useState(initialType);
  const [walletType, setWalletType] = useState('paytm');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [formValid, setFormValid] = useState(false);
  
  // Validate form on data change
  React.useEffect(() => {
    let valid = false;
    
    if (paymentType === 'card') {
      valid = cardNumber.length === 16 && 
        cardName.trim() !== '' && 
        expiryMonth.length === 2 && 
        expiryYear.length === 2 && 
        cvv.length === 3;
    } else if (paymentType === 'wallet') {
      valid = mobileNumber.length === 10;
    } else if (paymentType === 'netbanking') {
      valid = bankName !== '';
    }
    
    setFormValid(valid);
  }, [paymentType, cardNumber, cardName, expiryMonth, expiryYear, cvv, mobileNumber, bankName, walletType]);
  
  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };
  
  // Find wallet name display based on selected walletType
  const getWalletNameDisplay = (type) => {
    const wallet = walletOptions.find(w => w.id === type);
    return wallet ? wallet.name : type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let newPaymentMethod = {
      id: Date.now(), // Generate a unique ID
      isDefault: false
    };
    
    if (paymentType === 'card') {
      // Determine card type based on first digit
      let cardType = 'UNKNOWN';
      if (cardNumber.startsWith('4')) {
        cardType = 'VISA';
      } else if (cardNumber.startsWith('5')) {
        cardType = 'MASTERCARD';
      } else if (cardNumber.startsWith('6')) {
        cardType = 'RUPAY';
      }
      
      newPaymentMethod = {
        ...newPaymentMethod,
        type: 'card',
        cardNumber: cardNumber,
        lastFourDigits: cardNumber.slice(-4),
        cardName: cardName,
        cardType: cardType,
        expiryMonth: expiryMonth,
        expiryYear: expiryYear
      };
    } else if (paymentType === 'wallet') {
      // Get wallet icon based on type
      const selectedWallet = walletOptions.find(wallet => wallet.id === walletType);
      
      newPaymentMethod = {
        ...newPaymentMethod,
        type: 'wallet',
        name: selectedWallet.name,
        icon: selectedWallet.icon,
        mobileNumber: mobileNumber,
        balance: '₹0.00'
      };
    } else if (paymentType === 'netbanking') {
      newPaymentMethod = {
        ...newPaymentMethod,
        type: 'netbanking',
        bankName: bankName,
        icon: LOGO_BANK
      };
    }
    
    // Add new payment method
    addPaymentMethod(newPaymentMethod);
    
    // Navigate back to payment methods page
    navigate('/payment-methods');
  };
  
  return (
    <div className="add-payment-page">
      <div className="payment-header">
        <button className="back-button" onClick={handleBack}>
          <span>←</span>
        </button>
        <h1 className="payment-title">
          {paymentType === 'card' ? 'Add New Card' : 
           paymentType === 'wallet' ? 'Add Digital Wallet' : 
           'Add Netbanking'}
        </h1>
      </div>
      
      <div className="payment-content">
        <div className="payment-type-tabs">
          <button 
            className={`tab ${paymentType === 'card' ? 'active' : ''}`}
            onClick={() => setPaymentType('card')}
          >
            Card
          </button>
          <button 
            className={`tab ${paymentType === 'wallet' ? 'active' : ''}`}
            onClick={() => setPaymentType('wallet')}
          >
            Wallet
          </button>
          <button 
            className={`tab ${paymentType === 'netbanking' ? 'active' : ''}`}
            onClick={() => setPaymentType('netbanking')}
          >
            Netbanking
          </button>
        </div>
        
        {/* Card Form */}
        {paymentType === 'card' && (
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <label>Card Number</label>
              <input 
                type="text" 
                maxLength="16"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Cardholder Name</label>
              <input 
                type="text" 
                placeholder="Name on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <div className="expiry-inputs">
                  <input 
                    type="text" 
                    placeholder="MM"
                    maxLength="2"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                  <span>/</span>
                  <input 
                    type="text" 
                    placeholder="YY"
                    maxLength="2"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>CVV</label>
                <input 
                  type="password" 
                  maxLength="3"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="submit-button" disabled={!formValid}>
              Add Card
            </button>
          </form>
        )}
        
        {/* Wallet Form */}
        {paymentType === 'wallet' && (
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="wallet-selector">
              {walletOptions.map(option => (
                <button
                  key={option.id}
                  type="button"
                  className={`wallet-option ${walletType === option.id ? 'active' : ''}`}
                  onClick={() => setWalletType(option.id)}
                >
                  <img 
                    src={option.icon}
                    alt={option.name} 
                  />
                </button>
              ))}
            </div>
            
            <div className="form-group">
              <label>Mobile Number</label>
              <input 
                type="tel" 
                maxLength="10"
                placeholder="10-digit mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                required
              />
              <small>Enter the mobile number linked to your {getWalletNameDisplay(walletType)} account</small>
            </div>
            
            <button type="submit" className="submit-button" disabled={!formValid}>
              Link {getWalletNameDisplay(walletType)} Wallet
            </button>
          </form>
        )}
        
        {/* Netbanking Form */}
        {paymentType === 'netbanking' && (
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <label>Select Bank</label>
              <select 
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
              >
                <option value="">Select a bank</option>
                {bankOptions.map((bank, index) => (
                  <option key={index} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            
            <button type="submit" className="submit-button" disabled={!formValid}>
              Link Bank Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddPaymentMethodPage; 