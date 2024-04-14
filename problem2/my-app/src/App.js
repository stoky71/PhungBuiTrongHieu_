/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './App.css';
import Select from 'react-select';
import CurrencyInput from 'react-currency-input';
import axios from 'axios';

const currencies = [
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'BTC', label: 'Bitcoin (BTC)' },
  // Add more currencies as needed
];

const App = () => {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [amount, setAmount] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFromCurrencyChange = (selectedOption) => {
    setFromCurrency(selectedOption);
    fetchExchangeRate();
  };

  const handleToCurrencyChange = (selectedOption) => {
    setToCurrency(selectedOption);
    fetchExchangeRate();
  };

  const handleAmountChange = (event, maskedValue, internalValue) => {
    setAmount(internalValue);
  };

  const fetchExchangeRate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Replace with your desired API endpoint
      const response = await axios.get(`https://interview.switcheo.com/price.json`);
      const rates = response.data.rates;
      const rate = rates[fromCurrency.value] ? rates[fromCurrency.value][toCurrency.value] : 1;

      setExchangeRate(rate);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch exchange rate');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleConvert = () => {
    setReceivedAmount(amount * exchangeRate);
  };

  return (
    <div className="App">
      <h1>Currency Exchange</h1>
      <div className="exchange-form">
        <div className="form-group">
          <label htmlFor="from-currency">From:</label>
          <Select
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
            options={currencies}
          />
        </div>
        <div className="form-group">
          <label htmlFor="to-currency">To:</label>
          <Select value={toCurrency} onChange={handleToCurrencyChange} options={currencies} />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <CurrencyInput
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            prefix="$"
            allowNegativeValue={false}
          />
        </div>
        <button type="button" disabled={isLoading} onClick={handleConvert}>
          {isLoading ? 'Loading...' : 'Convert'}
        </button>
        {error && <p className="error">{error}</p>}
        {receivedAmount > 0 && (
          <p>You will receive: {receivedAmount.toFixed(2)} {toCurrency.value}</p>
        )}
      </div>
    </div>
  );
}

export default App;
