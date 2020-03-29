import React from 'react';

import '../css/blocks/header.css';
import '../css/blocks/global.css';
import '../css/settings.css';
import '../css/blocks/footer.css';

import SettingsForm from "./SettingsForm";

class Start extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <p className="header__title">School CI server</p>
                </div>
                <SettingsForm />
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
