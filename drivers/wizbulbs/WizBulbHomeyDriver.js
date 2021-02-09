'use strict';

const Homey = require('homey');
const { Discover } = require('WizBulbs');
const discovery = new Discovery();

module.exports = class WizBulbHomeyDriver extends Homey.Driver {

    async onPairListDevices() {
        let devices = [];
        await discover.scan(3000).then(result => {
            for (let i in result) {
                let rec = result[i];

                devices.push({
                    name: name,
                    data: {
                        id: getPartOne(rec);
                    },
                    settings: {
                        address: getPartTwo(rec),
                    },
                    capabilities: typeCapabilityMap[result[i].model],
                });
            }
        })
            .catch((err) => {
                return reject(err);
            });

        return devices;
    }

    getPartOne(rec) {
        let basis = rec.split(";");
        return basis[0];
    }

    getPartTwo(rec) {
        let basis = rec.split(";");
        return basis[0];
    }
}

module.exports = Discovery;