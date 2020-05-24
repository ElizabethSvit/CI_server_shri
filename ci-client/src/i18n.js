let _lang = 'ru';

function setLang(lang) {
    _lang = lang;
}

function generateText(msg, params) {
    let res = [], tmp = '';

    for (const char of msg) {
        switch (char) {
            default: tmp += char; break;
            case '{': {
                res.push(tmp);
                tmp = '';
                break;
            }
            case '}': {
                res.push(params[tmp]);
                tmp = '';
                break;
            }

        }
    }
}
function i18n(keys) {
    let keySet = keys[_lang];

    return (key, params) => generateText(keySet[key], params);
}

module.exports = {i18n, setLang};
