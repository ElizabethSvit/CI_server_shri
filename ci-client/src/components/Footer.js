import React from 'react';
import i18n from "../i18n";
import {withTranslation} from "react-i18next";

function Footer({ t, i18n }) {
    return (
        <div className="footer">
            <div className="footer__btn-block">
                <button className="footer__text-btn">{t('Support')}</button>
                <button
                    className="footer__text-btn footer__learning-text footer__learning-text_active">{t('Learning')}
                </button>
                <button onClick={() => {i18n.changeLanguage("ru")}}
                        className="footer__text-btn footer__learning-text footer__learning-text_active">Русская версия
                </button>
            </div>
            <p className="footer__text-rights">© 2020 Liza Svitanko</p>
        </div>
    );
}

export default withTranslation()(Footer);
