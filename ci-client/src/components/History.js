import React from 'react';
import '../css/blocks/build_header.css';
import '../css/blocks/ticket.css';
import '../css/blocks/global.css';
import '../css/history.css';
import '../css/blocks/footer.css';

class History extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <p className="header__title">philip1967/my-awesome-repo</p>
                    <div className="header__build-buttons-block">
                        <button className="button">
                            <img src="../../ci-client/src/images/run-icon.svg" className="header__settings-icon"/>
                                <p className="header__build-btn-text">Run build</p>
                        </button>
                        <button className="button">
                            <img src="../../ci-client/src/images/settings-icon.svg" className="header__settings-icon"/>
                        </button>
                    </div>
                </div>
                <div className="placeholder">
                    <div className="ticket">
                        <div className="ticket__content">
                            <div>
                                <div className="ticket__title ticket__title_accepted">
                                    <p className="ticket__number ticket__number_accepted">#1368</p>
                                    <p className="ticket__name">add documentation for postgres scaler</p>
                                </div>
                                <ul className="ticket__details">
                                    <ul className="ticket__details ticket__details_branch">
                                        <li className="ticket__info-text ticket__info-text-master">master</li>
                                        <li className="ticket__info-text ticket__info-text_index">9c9f0b9</li>
                                    </ul>
                                    <li className="ticket__info-text ticket__info-text-username">Philip Kirkorov</li>
                                </ul>
                            </div>
                            <hr />
                                <div className="ticket__time-details">
                                    <div className="ticket__time-info ticket__time-info_calendar">
                                        <img src="../../ci-client/src/images/calendar-icon.svg"
                                             className="ticket__time-icon"/>
                                            21 янв, 03:06
                                    </div>
                                    <div className="ticket__time-info">
                                        <img src="../../ci-client/src/images/timer-icon.svg"
                                             className="ticket__time-icon"/>
                                            1 ч 20 мин
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div className="ticket">
                        <div className="ticket__content">
                            <div>
                                <div className="ticket__title ticket__title_rejected">
                                    <p className="ticket__number ticket__number_rejected">#1367</p>
                                    <p className="ticket__name">Super cool UI kit for making websites that look like
                                        games</p>
                                </div>
                                <ul className="ticket__details">
                                    <ul className="ticket__details ticket__details_branch">
                                        <li className="ticket__info-text ticket__info-text-master">super-cool-ui-kit</li>
                                        <li className="ticket__info-text ticket__info-text_index">952e5567</li>
                                    </ul>
                                    <li className="ticket__info-text ticket__info-text-username">Vadim Makeev</li>
                                </ul>
                            </div>
                            <hr />
                                <div className="ticket__time-details">
                                    <div className="ticket__time-info ticket__time-info_calendar">
                                        <img src="../../ci-client/src/images/calendar-icon.svg"
                                             className="ticket__time-icon"/>
                                            21 янв, 03:06
                                    </div>
                                    <div className="ticket__time-info">
                                        <img src="../../ci-client/src/images/timer-icon.svg"
                                             className="ticket__time-icon"/>
                                            1 ч 20 мин
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div className="ticket">
                        <div className="ticket__content">
                            <div>
                                <div className="ticket__title ticket__title_accepted">
                                    <p className="ticket__number ticket__number_accepted">#1366</p>
                                    <p className="ticket__name">Merge branch 'master' of
                                        github.com:jaywcjlove/awesome</p>
                                </div>
                                <ul className="ticket__details">
                                    <ul className="ticket__details ticket__details_branch">
                                        <li className="ticket__info-text ticket__info-text-master">master</li>
                                        <li className="ticket__info-text ticket__info-text_index">b4636ab</li>
                                    </ul>
                                    <li className="ticket__info-text ticket__info-text-username">Philip Kirkorov</li>
                                </ul>
                            </div>
                            <hr/>
                                <div className="ticket__time-details">
                                    <div className="ticket__time-info ticket__time-info_calendar">
                                        <img src="../../ci-client/src/images/calendar-icon.svg"
                                             className="ticket__time-icon"/>
                                            21 янв, 03:06
                                    </div>
                                    <div className="ticket__time-info">
                                        <img src="../../ci-client/src/images/timer-icon.svg"
                                             className="ticket__time-icon"/>
                                            1 ч 20 мин
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div className="ticket">
                        <div className="ticket__content">
                            <div>
                                <div className="ticket__title ticket__title_await">
                                    <p className="ticket__number ticket__number_await">#1365</p>
                                    <p className="ticket__name">upgrade typescript to 3.8</p>
                                </div>
                                <ul className="ticket__details">
                                    <ul className="ticket__details ticket__details_branch">
                                        <li className="ticket__info-text ticket__info-text-master">master</li>
                                        <li className="ticket__info-text ticket__info-text_index">b4636ab</li>
                                    </ul>
                                    <li className="ticket__info-text ticket__info-text-username">Philip Kirkorov</li>
                                </ul>
                            </div>
                            <hr/>
                                <div className="ticket__time-details">
                                    <div className="ticket__time-info ticket__time-info_calendar">
                                        <img src="../../ci-client/src/images/calendar-icon.svg"
                                             className="ticket__time-icon"/>
                                            21 янв, 03:06
                                    </div>
                                    <div className="ticket__time-info">
                                        <img src="../../ci-client/src/images/timer-icon.svg"
                                             className="ticket__time-icon"/>
                                            1 ч 20 мин
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div className="ticket">
                        <div className="ticket__content">
                            <div>
                                <div className="ticket__title ticket__title_accepted">
                                    <p className="ticket__number ticket__number_accepted">#1364</p>
                                    <p className="ticket__name">add documentation for postgres scaler</p>
                                </div>
                                <ul className="ticket__details">
                                    <ul className="ticket__details ticket__details_branch">
                                        <li className="ticket__info-text ticket__info-text-master">master</li>
                                        <li className="ticket__info-text ticket__info-text_index">b4636ab</li>
                                    </ul>
                                    <li className="ticket__info-text ticket__info-text-username">Philip Kirkorov</li>
                                </ul>
                            </div>
                            <hr/>
                                <div className="ticket__time-details">
                                    <div className="ticket__time-info ticket__time-info_calendar">
                                        <img src="../../ci-client/src/images/calendar-icon.svg"
                                             className="ticket__time-icon"/>
                                            21 янв, 03:06
                                    </div>
                                    <div className="ticket__time-info">
                                        <img src="../../ci-client/src/images/timer-icon.svg"
                                             className="ticket__time-icon"/>
                                            1 ч 20 мин
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div className="ticket">
                        <div className="ticket__content">
                            <div>
                                <div className="ticket__title ticket__title_rejected">
                                    <p className="ticket__number ticket__number_rejected">#1367</p>
                                    <p className="ticket__name">replace all `div` to `article`</p>
                                </div>
                                <ul className="ticket__details">
                                    <ul className="ticket__details ticket__details_branch">
                                        <li className="ticket__info-text ticket__info-text-master">master</li>
                                        <li className="ticket__info-text ticket__info-text_index">952e5567</li>
                                    </ul>
                                    <li className="ticket__info-text ticket__info-text-username">Vadim Makeev</li>
                                </ul>
                            </div>
                            <hr/>
                                <div className="ticket__time-details">
                                    <div className="ticket__time-info ticket__time-info_calendar">
                                        <img src="../../ci-client/src/images/calendar-icon.svg"
                                             className="ticket__time-icon"/>
                                            21 янв, 03:06
                                    </div>
                                    <div className="ticket__time-info">
                                        <img src="../../ci-client/src/images/timer-icon.svg"
                                             className="ticket__time-icon"/>
                                            1 ч 20 мин
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div className="ticket">
                        <div className="ticket__content">
                            <div>
                                <div className="ticket__title ticket__title_accepted">
                                    <p className="ticket__number ticket__number_accepted">#1362</p>
                                    <p className="ticket__name">improved accessibility</p>
                                </div>
                                <ul className="ticket__details">
                                    <ul className="ticket__details ticket__details_branch">
                                        <li className="ticket__info-text ticket__info-text-master">master</li>
                                        <li className="ticket__info-text ticket__info-text_index">e41e4cc</li>
                                    </ul>
                                    <li className="ticket__info-text ticket__info-text-username">Philip Kirkorov</li>
                                </ul>
                            </div>
                            <hr/>
                                <div className="ticket__time-details">
                                    <div className="ticket__time-info ticket__time-info_calendar">
                                        <img src="../../ci-client/src/images/calendar-icon.svg"
                                             className="ticket__time-icon"/>
                                            21 янв, 03:06
                                    </div>
                                    <div className="ticket__time-info">
                                        <img src="../../ci-client/src/images/timer-icon.svg"
                                             className="ticket__time-icon"/>
                                            1 ч 20 мин
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div className="ticket">
                        <div className="ticket__content">
                            <div>
                                <div className="ticket__title ticket__title_accepted">
                                    <p className="ticket__number ticket__number_accepted">#1350</p>
                                    <p className="ticket__name">fix: upload 别片类型</p>
                                </div>
                                <ul className="ticket__details">
                                    <ul className="ticket__details ticket__details_branch">
                                        <li className="ticket__info-text ticket__info-text-master">master</li>
                                        <li className="ticket__info-text ticket__info-text_index">e41e4cc</li>
                                    </ul>
                                    <li className="ticket__info-text ticket__info-text-username">Philip Kirkorov</li>
                                </ul>
                            </div>
                            <hr/>
                                <div className="ticket__time-details">
                                    <div className="ticket__time-info ticket__time-info_calendar">
                                        <img src="../../ci-client/src/images/calendar-icon.svg"
                                             className="ticket__time-icon"/>
                                            21 янв, 03:06
                                    </div>
                                    <div className="ticket__time-info">
                                        <img src="../../ci-client/src/images/timer-icon.svg"
                                             className="ticket__time-icon"/>
                                            1 ч 20 мин
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div className="ticket">
                        <div className="ticket__content">
                            <div>
                                <div className="ticket__title ticket__title_accepted">
                                    <p className="ticket__number ticket__number_accepted">#1349</p>
                                    <p className="ticket__name">Form li has default height align with form size</p>
                                </div>
                                <ul className="ticket__details">
                                    <ul className="ticket__details ticket__details_branch">
                                        <li className="ticket__info-text ticket__info-text-master">master</li>
                                        <li className="ticket__info-text ticket__info-text_index">e41e4cc</li>
                                    </ul>
                                    <li className="ticket__info-text ticket__info-text-username">Philip Kirkorov</li>
                                </ul>
                            </div>
                            <hr/>
                                <div className="ticket__time-details">
                                    <div className="ticket__time-info ticket__time-info_calendar">
                                        <img src="../../ci-client/src/images/calendar-icon.svg"
                                             className="ticket__time-icon"/>
                                            21 янв, 12:06
                                    </div>
                                    <div className="ticket__time-info">
                                        <img src="../../ci-client/src/images/timer-icon.svg"
                                             className="ticket__time-icon"/>
                                            1 ч 20 мин
                                    </div>
                                </div>
                        </div>
                    </div>

                    <button className="button header__build-btn-text show-more-button">
                        Show more
                    </button>

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

export default History;
