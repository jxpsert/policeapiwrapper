const Fetch = require('node-fetch');
const Collection = require('@discordjs/collection');
const Force = require('./Force.js');
const Officer = require('./Officer.js');

class ForcesManager { // manages forces in a Client - <Client>.forces
    constructor() {
        this.cache = new Collection();
    }

    async fetch(id) {
        try {
            if (!this.cache.get(id)) {
                let force = await Fetch(`https://data.police.uk/api/forces/${id}`);
                let forceJSON = await force.json();

                let seniors = await Fetch(`https://data.police.uk/api/forces/${id}/people`);
                let seniorsJSON = await seniors.json();

                let seniorOfficers = new Collection();

                seniorsJSON.forEach(senior => {
                    let newOfficer = new Officer({
                        "name": senior.name,
                        "rank": senior.rank,
                        "bio": senior.bio,
                        "contact": senior.contact_details
                    });
                    seniorOfficers.set(senior.name, newOfficer);
                })

                let forceObject = new Force({
                    "id": forceJSON.id,
                    "name": forceJSON.name,
                    "description": forceJSON.description,
                    "telephone": forceJSON.telephone,
                    "engagement": forceJSON.engagement_methods,
                    "url": forceJSON.url,
                    "seniors": seniorOfficers
                });
            } else {
                return this.cache.get(id);
            }
            this.cache.set(id, forceObject);
            return forceObject;
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = ForcesManager;