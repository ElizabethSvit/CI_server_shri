import React from 'react';
import '../css/blocks/build_header.css';
import '../css/blocks/ticket.css';
import '../css/blocks/global.css';
import '../css/details.css';
import '../css/blocks/footer.css';

import {
    Link
} from "react-router-dom";

import rebuildIcon from "../images/rebuild-icon.svg";
import settingsIcon from "../images/settings-icon.svg";

class Details extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <p className="header__title">philip1967/my-awesome-repo</p>
                    <div className="header__build-buttons-block">
                        <button className="button">
                            <img src={rebuildIcon} className="header__settings-icon"/>
                                <p className="header__build-btn-text">Rebuild</p>
                        </button>
                        <button className="button">
                            <img src={settingsIcon} className="header__settings-icon"/>
                        </button>
                    </div>
                </div>
                <div className="placeholder">
                    <div className="ticket">
                        <div className="ticket__content">
                            <div className="ticket__content_placeholder">
                                <div className="ticket__title ticket__title_accepted">
                                    <p className="ticket__number ticket__number_accepted">#1368</p>
                                    <p className="ticket__name">add documentation for postgres scaler</p>
                                </div>
                                <ul className="ticket__details">
                                    <ul className="ticket__details ticket__details_branch">
                                        <li className="ticket__info-text ticket__info-text-master">master</li>
                                        <li className="ticket__info-text ticket__info-text_index">b4636ab</li>
                                    </ul>
                                    <li className="ticket__info-text ticket__info-text-username">Philip Kirkorov</li>
                                </ul>
                                <hr/>
                                    <div className="ticket__time-details">
                                        <div className="ticket__time-info ticket__time-info_calendar">
                                            21 янв, 03:06
                                        </div>
                                        <div className="ticket__time-info ticket__time-info_timer">
                                            1 ч 20 мин
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="big-log">
                        <code className="big-log__text">
                            logs here
                        </code>
                    </div>
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

export default Details;
