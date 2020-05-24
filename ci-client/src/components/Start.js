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

let { i18n, setLang } = require('../i18n.js');
let keys = require('../App.keys.json');

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i18nApp: i18n(keys)
        }
    }

    setLanguage = (lang) => {
        setLang(lang);
    };

    render() {
        return (
            <div>
                <div className="header">
                    <p className="header__title">{this.state.i18nApp('header__title', 'School CI server')}</p>
                    <button className="button">
                        <img src={settingsIcon} className="header__settings-icon"/>
                            <p className="header__settings-btn-text">Settings</p>
                    </button>
                </div>
                <div className="start-page-layout">
                    <img src={instrumentsIcon} className="placeholder__icon"/>
                        <p className="placeholder__text">Configure repository connection and synchronization
                            settings</p>
                    <Link to="/settings">
                        <button className="placeholder__btn placeholder__btn-text">
                            Open settings
                        </button>
                    </Link>
                </div>
                <div className="footer">
                    <div className="footer__btn-block">
                        <button className="footer__text-btn">Support</button>
                        <button
                            className="footer__text-btn footer__learning-text footer__learning-text_active">Learning
                        </button>
                        <button onClick={this.setLanguage('ru')}
                            className="footer__text-btn footer__learning-text footer__learning-text_active">Русская версия
                        </button>
                    </div>
                    <p className="footer__text-rights">© 2020 Liza Svitanko</p>
                </div>
            </div>
        );
    }
}

export default Start;
