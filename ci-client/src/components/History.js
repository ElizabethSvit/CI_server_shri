import React from 'react';
import '../css/blocks/build_header.css';
import '../css/blocks/ticket.css';
import '../css/blocks/global.css';
import '../css/history.css';
import '../css/blocks/footer.css';

import runIcon from "../images/run-icon.svg";
import settingsIcon from "../images/settings-icon.svg";

import Ticket from './Ticket';
import {withRouter} from "react-router";
import {Translation} from 'react-i18next';
import Footer from "./Footer";

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newBuild: false,
            commitHash: '2e2e218201c5ef56f5a60909db02504a06060494',
            buildsList: [],
        };
    }

    componentDidMount() {
        fetch('/api/builds')
            .then(res => res.json())
            .then(res => {
                this.setState({buildsList: res})
            });
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
        fetch('/api/builds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'commitHash': this.state.commitHash}),
        }).then(res => {
            return res.json();
        }).then((res) => {
            this.props.history.push(`/build/${res.buildNumber}`);
        });
    };

    handleGoToSettings = () => {
        this.props.history.push(`/settings`);
    };

    render() {
        return (
            <div>
                {this.state.newBuild && <div className="overlay-alert">
                    <div className="overlay-alert-card">
                        <form className="form" onSubmit={this.handleSubmitNewBuild}>
                            <Translation className="form__title">
                                {
                                    t => <h1>{t('New build')}</h1>
                                }
                            </Translation>
                            <Translation className="form__text">
                                {
                                    t => <h1>{t('Enter the commit hash which you want to build.')}</h1>
                                }
                            </Translation>

                            <div className="text-input">
                                <input required placeholder="Commit hash" type="text"
                                       className="text-input__text-box text-input__text-box_non-empty"
                                       value={this.state.commitHash} onChange={this.handleUpdateCommitHash}/>
                            </div>
                            <div className="form__buttons-block">
                                <button className="form__button form__button_save" type="submit">
                                    <Translation className="form__button form__button_save">
                                        {
                                            t => <h1>{t('Build')}</h1>
                                        }
                                    </Translation>
                                </button>
                                <button className="form__button form__button_cancel"
                                        onClick={this.handleCancelNewBuild}>
                                    <Translation className="form__button form__button_cancel">
                                        {
                                            t => <h1>{t('Cancel')}</h1>
                                        }
                                    </Translation>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>}
                <div className="header">
                    <p className="header__title">repo-name
                        {/*{this.props.location.state.repoName}*/}
                    </p>
                    <div className="header__build-buttons-block">
                        <button className="button" onClick={this.handleRunBuild}>
                            <img src={runIcon} className="header__settings-icon"/>
                            <Translation className="button header__build-btn-text">
                                {
                                    t => <h1>{t('Run build')}</h1>
                                }
                            </Translation>
                        </button>
                        <button className="button" onClick={this.handleGoToSettings}>
                            <img src={settingsIcon} className="header__settings-icon"/>
                        </button>
                    </div>
                </div>
                <div className="placeholder">
                    {this.state.buildsList.map(build =>
                        <Ticket
                            ticketName={build.commitMessage}
                            buildNumber={build.buildNumber}
                            commitHash={build.commitHash}
                            authorName={build.authorName}
                            branchName={build.branchName.split('->')[1]}
                            startTime={build.start}
                            status={build.status}
                        />
                    )}

                    {/*<button className="button header__build-btn-text show-more-button">*/}
                    {/*    Show more*/}
                    {/*</button>*/}

                </div>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(History);
