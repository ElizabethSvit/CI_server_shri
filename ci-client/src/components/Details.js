import React from 'react';
import '../css/blocks/build_header.css';
import '../css/blocks/ticket.css';
import '../css/blocks/global.css';
import '../css/details.css';
import '../css/blocks/footer.css';

import rebuildIcon from "../images/rebuild-icon.svg";
import settingsIcon from "../images/settings-icon.svg";
import Ticket from "./Ticket";
import {withRouter} from "react-router";
import {Translation} from "react-i18next";
import Footer from "./Footer";

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buildsList: [],
            logs: '',
        };
    }

    handleGoToSettings = () => {
        this.props.history.push(`/settings`);
    };

    render() {
        return (
            <div>
                <div className="header">
                    <p className="header__title">philip1967/my-awesome-repo</p>
                    <div className="header__build-buttons-block">
                        <button className="button">
                            <img src={rebuildIcon} className="header__settings-icon"/>
                            <Translation className="header__build-btn-text">
                                {
                                    t => <h1>{t('Rebuild')}</h1>
                                }
                            </Translation>
                        </button>
                        <button className="button">
                            <img src={settingsIcon} className="header__settings-icon"/>
                        </button>
                    </div>
                </div>
                {/*TODO: отображение пока работает только с перехода из history*/}
                <div className="placeholder">
                    <Ticket
                        ticketName={this.props.location.state.commitMessage}
                        buildNumber={this.props.location.state.buildNumber}
                        commitHash={this.props.location.state.commitHash}
                        authorName={this.props.location.state.authorName}
                        branchName={this.props.location.state.branchName}
                        startTime={this.props.location.state.start}
                        status={this.props.location.state.status}
                    />
                    <div className="big-log">
                        <code className="big-log__text">
                            logs here
                        </code>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(Details);
