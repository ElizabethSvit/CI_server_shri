import React from 'react';

import '../css/blocks/header.css';
import '../css/blocks/global.css';
import '../css/settings.css';
import '../css/blocks/footer.css';

import SettingsForm from "./SettingsForm";
import Footer from "./Footer";
import {withTranslation} from "react-i18next";

function Settings({ t }){
    return (
        <div>
            <div className="header">
                <p className="header__title">
                    {t('School CI server')}
                </p>
            </div>
            <SettingsForm />
            <Footer />
        </div>
    );
}

export default withTranslation()(Settings);
