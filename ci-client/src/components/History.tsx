import React, {SyntheticEvent} from 'react';
import '../css/blocks/build_header.css';
import '../css/blocks/ticket.css';
import '../css/blocks/global.css';
import '../css/history.css';
import '../css/blocks/footer.css';

import runIcon from "../images/run-icon.svg";
import settingsIcon from "../images/settings-icon.svg";

import Ticket from './Ticket';
import { RouteComponentProps, withRouter } from "react-router-dom";
import {Build} from "../types/commonTypes";

type StateType = {
    newBuild: boolean,
    commitHash: string,
    buildsList: Array<Build>,
}

type PropsType = RouteComponentProps & {
    history: Array<string>,
    location: {
        state: any;
    },
}

class History extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);
        this.state = {
            newBuild: false,
            commitHash: '2e2e218201c5ef56f5a60909db02504a06060494',
            buildsList: [],
        };

        this.handleRunBuild = this.handleRunBuild.bind(this);
        this.handleCancelNewBuild = this.handleCancelNewBuild.bind(this);
        this.handleUpdateCommitHash = this.handleUpdateCommitHash.bind(this);
        this.handleSubmitNewBuild = this.handleSubmitNewBuild.bind(this);
        this.handleGoToSettings = this.handleGoToSettings.bind(this);
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

    handleUpdateCommitHash = (event: SyntheticEvent) => {
        this.setState({commitHash: (event.target as HTMLInputElement).value});
    };

    handleSubmitNewBuild = async () => {
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
                    <p className="header__title">repo-name
                        {/*{this.props.location.state.repoName}*/}
                    </p>
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

export default withRouter(History);
