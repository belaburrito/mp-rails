import React, { useState } from 'react';
import '../../assets/stylesheets/application.css';
import axios from 'axios';

export default function GuestForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (name.split(' ').length < 2) {
      errors.name = '*must be your first and last name';
    }

    if (!phone.match(/^\d{10,11}$/)) {
      errors.phone = '*numbers only (ex. 1231231234)';
    }

    if (Object.keys(errors).length) {
      setFullNameError(errors.name || '');
      setPhoneError(errors.phone || '');
      return;
    }

    try {
      const res = await fetch('api/v1/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guest: {name, phone} }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        return {res};
      }
    } catch (err) {
      return {err};
    }
  };

  if (success) {
    return <div>Thank you, {name}!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-div">
        <div className="input-wrapper">
          <label htmlFor="name" className={fullNameError ? 'form-control-label label-error' : 'form-control-label'}>Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Please enter your full name"
            onChange={(e) => setName(e.target.value)}
            className={fullNameError ? 'form-control error' : 'form-control'}
          />
        </div>
        <div className="form-error">{fullNameError}</div>
      </div>

      <div className="form-div">
        <div className="input-wrapper">
          <label htmlFor="phone" className={phoneError ? 'form-control-label label-error' : 'form-control-label'}>Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            placeholder="Your Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            className={phoneError ? 'form-control error' : 'form-control'}
          />
        </div>
       
        <div className="form-error">{phoneError}</div>
      </div>
      <button type="submit">View menu</button>
    </form>
  );
}
