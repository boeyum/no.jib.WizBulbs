'use strict';

const Homey = require('homey');

class WizBulbsApp extends Homey.App {

    onInit() {
        this.log('init');
    }

}

module.exports = WizBulbsApp;