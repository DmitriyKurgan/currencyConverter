import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import styles from './Header.module.css'
import logo from '../assets/logo.jpg'
import {CurrencyInput} from "./CurrencyInput";

export type InputnameType = 'amount' | 'convertedAmount';
export type ConvertTitleType = 'From' | 'To';

export const Header = () => {
    const [fromCurrency, setFromCurrency] = useState('UAH');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState(0);
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [amountError, setAmountError] = useState('');

    useEffect(() => {
        const getExchangeRate = async () => {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const exchangeRate = response.data.rates[toCurrency];
            setExchangeRate(exchangeRate);
        };
        getExchangeRate();
        setConvertedAmount(amount * exchangeRate);
    }, [fromCurrency, toCurrency, amount, convertedAmount, exchangeRate]);

    const handleFromCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFromCurrency(event.currentTarget.value);
    };

    const handleToCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setToCurrency(event.currentTarget.value);
    };

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.currentTarget.value);

        if (value < 0) {
            setAmountError('Incorrect value!');
            return;
        }

        setAmountError('');
        const newValue = event.currentTarget.name === 'amount' ? value : value / exchangeRate;
        setAmount(newValue);
        setConvertedAmount(newValue * exchangeRate);
    };

    return (
        <div className={styles.header}>
            <div className={styles.title}>
                <h1>Сurrency converter</h1>
                <img className={styles.logo} src={logo} alt='logo'/>
            </div>
            <CurrencyInput
                convertTitle='From'
                name='amount'
                amount={amount}
                currency={fromCurrency}
                onAmountChange={handleAmountChange}
                onCurrencyChange={handleFromCurrencyChange}
                error={amountError}
            />
            <CurrencyInput
                convertTitle='To'
                name='convertedAmount'
                amount={convertedAmount}
                currency={toCurrency}
                onAmountChange={handleAmountChange}
                onCurrencyChange={handleToCurrencyChange}
                error={amountError}
            />
        </div>
    );
};

