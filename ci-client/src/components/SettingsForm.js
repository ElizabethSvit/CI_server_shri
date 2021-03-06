import React from 'react';
import { withRouter } from "react-router";
import MaskedInput from 'react-text-mask';

class SettingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            repoName: '',
            buildCommand: 'npm ci && npm run build',
            branchName: 'master',
            minutesSync: '10',

            response: '',
            isLoading: false,
        };

        this.handleChangeRepo = this.handleChangeRepo.bind(this);
        this.handleChangeBuildCmd = this.handleChangeBuildCmd.bind(this);
        this.handleChangeBranchName = this.handleChangeBranchName.bind(this);
        this.handleChangeMinutesSync = this.handleChangeMinutesSync.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
        this.setState({isLoading: true});
        e.preventDefault();
        fetch('/api/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'repoName': this.state.repoName,
                'buildCommand': this.state.buildCommand,
                'mainBranch': this.state.branchName,
                'period': parseInt(this.state.minutesSync),
            }),
        }).then(res => {
            return res.json();
        }).then((res) => {
            if (res.result.status === 200) {
                this.props.history.push({
                    pathname: '/history',
                    state: {repoName: this.state.repoName}
                });
            } else {
                alert('Ошибка сохранения настроек');
            }
            this.setState({isLoading: false});
        });
    };

    handleChangeRepo(event) {
        this.setState({repoName: event.target.value});
    }

    handleChangeBuildCmd(event) {
        this.setState({buildCommand: event.target.value});
    }

    handleChangeBranchName(event) {
        this.setState({branchName: event.target.value});
    }

    handleChangeMinutesSync(event) {
        this.setState({minutesSync: event.target.value});
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <h3 className="form__title">Settings</h3>
                <p className="form__text">Configure repository connection and synchronization settings.</p>

                <div className="text-input">
                    <p className="text-input__title text-input__title_required">GitHub repository</p>
                    <input required placeholder="user-name/repo-name" type="text"
                           className="text-input__text-box text-input__text-box_non-empty"
                           value={this.state.repoName} onChange={this.handleChangeRepo}/>
                </div>
                <div className="text-input">
                    <p className="text-input__title">Build command</p>
                    <input required type="text"
                           className="text-input__text-box text-input__text-box_non-empty"
                           value={this.state.buildCommand} onChange={this.handleChangeBuildCmd}/>
                </div>
                <div className="text-input">
                    <p className="text-input__title">Main branch</p>
                    <input type="text"
                           className="text-input__text-box text-input__text-box_non-empty"
                           value={this.state.branchName} onChange={this.handleChangeBranchName}/>
                </div>
                <div className="text-input sync-info">Synchronize every
                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, /[0-9]/]}
                        className="text-input__text-box text-input__text-box_number-input"
                        placeholder=""
                        value={this.state.minutesSync}
                        guide={false}
                        onBlur={() => {}}
                        onChange={this.handleChangeMinutesSync}
                    />
                    minutes
                </div>
                <div className="form__buttons-block">
                    <button className="form__button form__button_save" type="submit" disabled={this.state.isLoading}>Save</button>
                    <button className="form__button form__button_cancel">Cancel</button>
                </div>
            </form>
        );
    }
}

export default withRouter(SettingsForm);