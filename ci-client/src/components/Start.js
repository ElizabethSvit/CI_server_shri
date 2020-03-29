import React from 'react';
import '../css/blocks/header.css';
import '../css/blocks/global.css';
import '../css/start.css';
import '../css/blocks/footer.css';

import {
    Link
} from "react-router-dom";

class Start extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <p className="header__title">School CI server</p>
                    <button className="button">
                        <img inline src="../images/settings-icon.svg" className="header__settings-icon"/>
                            <p className="header__settings-btn-text">Settings</p>
                    </button>
                </div>
                <div className="start-page-layout">
                    <img inline src="../images/instruments.svg" className="placeholder__icon"/>
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
                    </div>
                    <p className="footer__text-rights">© 2020 Liza Svitanko</p>
                </div>
            </div>
        );
    }
}

export default Start;
