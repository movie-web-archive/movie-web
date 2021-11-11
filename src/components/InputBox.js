import React from 'react';
import { Arrow } from './Arrow';
import './InputBox.css'
import { useTranslation } from 'react-i18next';

// props = { onSubmit: (str) => {}, placeholder: string}
export function InputBox({ onSubmit, placeholder }) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = React.useState("");

    return (
        <form className="inputBar" onSubmit={(e) => {
            e.preventDefault();
            onSubmit(searchTerm)
            return false;
        }}>
            <input
                type='text'
                className="inputTextBox"
                id="inputTextBox"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                required
            />
            <button className="inputSearchButton">
                <span className="text">{t("Search")}<span className="arrow"><Arrow /></span></span>
            </button>
        </form>
    )
}
