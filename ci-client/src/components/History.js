import React from 'react';
import '../css/blocks/build_header.css';
import '../css/blocks/ticket.css';
import '../css/blocks/global.css';
import '../css/history.css';
import '../css/blocks/footer.css';

import runIcon from "../images/run-icon.svg";
import settingsIcon from "../images/settings-icon.svg";

export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newBuild: false,
            commitHash: ''
        };

        this.handleRunBuild = this.handleRunBuild.bind(this);
        this.handleCancelNewBuild = this.handleCancelNewBuild.bind(this);
        this.handleUpdateCommitHash = this.handleUpdateCommitHash.bind(this);
        this.handleSubmitNewBuild = this.handleSubmitNewBuild.bind(this);
        this.handleGoToSettings = this.handleGoToSettings.bind(this);
    }

    handleRunBuild = () => {
        this.setState({newBuild: true});
    };

    handleCancelNewBuild = () => {
        this.setState({newBuild: false});
    };

    handleUpdateCommitHash = event => {
        this.setState({commitHash: event.target.value});
    };

    handleSubmitNewBuild = async e => {
        e.preventDefault();
        const response = await fetch('/api/builds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'commitHash': this.state.commitHash}),
        });
        console.log('response to new build', response);

        const buildId = 1;
        this.props.history.push(`/build/${buildId}`);
    };

    handleGoToSettings = () => {
        this.props.history.push(`/settings`);
    };

    render() {
        return (
            <div>
                {this.state.newBuild && <div className="overlay-alert">
                    <div className="overlay-alert-card">
                        <form className="form"  onSubmit={this.handleSubmitNewBuild}>
                            <h3 className="form__title">New build</h3>
                            <p className="form__text">Enter the commit hash which you want to build.</p>

                            <div className="text-input">
                                <input required placeholder="Commit hash" type="text"
                                       className="text-input__text-box text-input__text-box_non-empty"
                                       value={this.state.commitHash} onChange={this.handleUpdateCommitHash}/>
                            </div>
                            <div className="form__buttons-block">
                                <button className="form__button form__button_save" type="submit">Build</button>
                                <button className="form__button form__button_cancel" onClick={this.handleCancelNewBuild}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>}
                <div className="header">
                    <p className="header__title">philip1967/my-awesome-repo</p>
                    <div className="header__build-buttons-block">
                        <button className="button" onClick={this.handleRunBuild }>
                            <img src={runIcon} className="header__settings-icon"/>
                                <p className="header__build-btn-text">Run build</p>
                        </button>
                        <button className="button" onClick={this.handleGoToSettings }>
                            <img src={settingsIcon} className="header__settings-icon"/>
                        </button>
                    </div>
                </div>
                <div className="placeholder">
                    {/*<div className="ticket">*/}
                    {/*    <div className="ticket__content">*/}
                    {/*        <div>*/}
                    {/*            <div className="ticket__title ticket__title_accepted">*/}
                    {/*                <p className="ticket__number ticket__number_accepted">#1368</p>*/}
                    {/*                <p className="ticket__name">add documentation for postgres scaler</p>*/}
                    {/*            </div>*/}
                    {/*            <ul className="ticket__details">*/}
                    {/*                <ul className="ticket__details ticket__details_branch">*/}
                    {/*                    <li className="ticket__info-text ticket__info-text-master">master</li>*/}
                    {/*                    <li className="ticket__info-text ticket__info-text_index">9c9f0b9</li>*/}
                    {/*                </ul>*/}
                    {/*                <li className="ticket__info-text ticket__info-text-username">Philip Kirkorov</li>*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*        <hr />*/}
                    {/*            <div className="ticket__time-details">*/}
                    {/*                <div className="ticket__time-info ticket__time-info_calendar">*/}
                    {/*                    <img src="../../ci-client/src/images/calendar-icon.svg"*/}
                    {/*                         className="ticket__time-icon"/>*/}
                    {/*                        21 янв, 03:06*/}
                    {/*                </div>*/}
                    {/*                <div className="ticket__time-info">*/}
                    {/*                    <img src="../../ci-client/src/images/timer-icon.svg"*/}
                    {/*                         className="ticket__time-icon"/>*/}
                    {/*                        1 ч 20 мин*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<button className="button header__build-btn-text show-more-button">*/}
                    {/*    Show more*/}
                    {/*</button>*/}

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
