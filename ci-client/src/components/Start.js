import React from 'react';
import '../css/blocks/header.css';
import '../css/blocks/global.css';
import '../css/start.css';
import '../css/blocks/footer.css';

import settingsIcon from '../images/settings-icon.svg';
import instrumentsIcon from '../images/instruments.svg';

import {
    Link
} from "react-router-dom";
import Footer from "./Footer";
import {withTranslation} from "react-i18next";

function Start({t}) {
    return (
        <div>
            <div className="header">
                <p className="header__title">
                    {t('School CI server')}
                </p>
                <button className="button">
                    <img src={settingsIcon} className="header__settings-icon"/>
                    <p className="header__settings-btn-text">
                        {t('Settings')}
                    </p>
                </button>
            </div>
            <div className="start-page-layout">
                <img src={instrumentsIcon} className="placeholder__icon"/>
                <p className="placeholder__text">
                    {t('Configure repository connection and synchronization\n' +
                        '                            settings')}
                </p>
                <Link to="/settings">
                    <button className="placeholder__btn placeholder__btn-text">
                        {t('Open settings')}
                    </button>
                </Link>
            </div>
            <Footer/>
        </div>
    );
}

export default withTranslation()(Start);
