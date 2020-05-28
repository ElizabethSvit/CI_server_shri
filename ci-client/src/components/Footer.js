import React, {useState} from 'react';
import i18n from "../i18n";
import {withTranslation} from "react-i18next";

function Footer({ t, i18n }) {
    const [lang, setLang] = useState("en");

    return (
        <div className="footer">
            <div className="footer__btn-block">
                <button className="footer__text-btn">{t('Support')}</button>
                <button
                    className="footer__text-btn footer__learning-text footer__learning-text_active">{t('Learning')}
                </button>
                <button onClick={() => {
                    if (lang === "en") {
                        i18n.changeLanguage("ru");
                        setLang("ru");
                    } else {
                        i18n.changeLanguage("en");
                        setLang("en");
                    }
                }}
                        className="footer__text-btn footer__learning-text footer__learning-text_active">
                    {t('Русская версия')}
                </button>
            </div>
            <p className="footer__text-rights">© 2020 {t('Liza Svitanko')}</p>
        </div>
    );
}

export default withTranslation()(Footer);
