import React, {ChangeEventHandler, FC} from 'react'
import styles from './Header.module.css';
import {ConvertTitleType, InputnameType} from "./Header";

type CurrencyInputProps = {
    name: InputnameType
    amount: number
    currency: string
    onAmountChange: ChangeEventHandler<HTMLInputElement>
    onCurrencyChange: ChangeEventHandler<HTMLSelectElement>
    error: string
    convertTitle: ConvertTitleType
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
                                                          amount,
                                                          currency,
                                                          onAmountChange,
                                                          onCurrencyChange,
                                                          name,
                                                          convertTitle,
                                                          error
                                                      }) => {

    const inputStyle = error ? styles.errorInput : styles.input;

    return (
        <div>
            <label className={styles.label}>{convertTitle}:</label>
            <input
                type="number"
                step="0.01"
                name={name}
                value={amount}
                onChange={onAmountChange}
                className={inputStyle}
            />
            <select
                value={currency}
                onChange={onCurrencyChange}
                className={styles.select}
            >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="UAH">UAH</option>
            </select>
        </div>
    )
}

