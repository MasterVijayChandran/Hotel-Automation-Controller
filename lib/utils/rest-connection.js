'use strict';

const axios = require('axios');
const appConfig = require('../config/app');
const querystring = require('querystring');

let restConnector = {};

restConnector.makeRequest = async (baseUrl, url, data, method, cb) => {

    try {
        if (!method) {
            method = 'post';
        }
        let reqOptions = formReqOptions(baseUrl, url, data);

        axios[method](reqOptions).then(res => {
            if (res && res.status==200) {
                cb(null, res);
            } else {
                cb(res);
            }
        }).catch(err => {
            cb(err);
        });
    } catch (err) {
        cb(err);
    }

};

restConnector.getRequest = (url, cb) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await axios.get(url);
            resolve(res.data)
        } catch (error) {
            reject(error)
        }
    })
}

function formReqOptions(baseUrl, url, data) {
    let reqOptions = {
        baseUrl,
        url,
        auth: {
            username: appConfig.basic_uname,
            password: appConfig.basic_pw
        }
    };

    if (data && data.body) {
        reqOptions.data = data.body;
    }
    if (data && data.params) {
        reqOptions.params = data.params;
    }
    if (data && data.query) {
        reqOptions.url += '?'+querystring.stringify(data.query);
    }

    return reqOptions;
}

module.exports = restConnector;
