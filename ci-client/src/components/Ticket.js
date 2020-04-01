import React from 'react';
import Moment from 'react-moment';

import calendarIcon from "../images/calendar-icon.svg";
import timerIcon from "../images/timer-icon.svg";

import {withRouter} from "react-router";

class Ticket extends React.Component {
    goToDetails = () => {
        this.props.history.push({
            pathname: `/build/${this.props.buildNumber}`,
            state: {
                ticketName: this.props.ticketName,
                buildNumber: this.props.buildNumber,
                commitHash: this.props.commitHash,
                authorName: this.props.authorName,
                branchName: this.props.branchName,
                startTime: this.props.startTime,
                status: this.props.status,
            }
        });
    };

    render() {
        return (
                <div className="ticket" onClick={this.goToDetails}>
                    <div className="ticket__content">
                        <div>
                            <div className={"ticket__title ticket__title_" + this.props.status.toString()}>
                                <p className={"ticket__number ticket__number_" + this.props.status.toString()}>#{this.props.buildNumber}</p>
                                <p className="ticket__name">{this.props.ticketName}</p>
                            </div>
                            <ul className="ticket__details">
                                <ul className="ticket__details ticket__details_branch">
                                    <li className="ticket__info-text ticket__info-text-master">{this.props.branchName}</li>
                                    <li className="ticket__info-text ticket__info-text_index">{this.props.commitHash}</li>
                                </ul>
                                <li className="ticket__info-text ticket__info-text-username">{this.props.authorName}</li>
                            </ul>
                        </div>
                        <hr />
                        <div className="ticket__time-details">
                            <div className="ticket__time-info ticket__time-info_calendar">
                                <img src={calendarIcon}
                                     className="ticket__time-icon"/>
                                <Moment titleFromat="D MMM YYYY" format="D MMM YYYY HH:mm" withTitle>
                                    {this.props.startTime}
                                </Moment>
                            </div>
                            <div className="ticket__time-info">
                                <img src={timerIcon}
                                     className="ticket__time-icon"/>
                                1 ч 20 мин
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default withRouter(Ticket);
