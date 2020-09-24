const Fetch = require('node-fetch');
const Collection = require('@discordjs/collection');
const Neighbourhood = require('./Neighbourhood.js');
const Officer = require('./Officer.js');

class NeighbourhoodsManager {
    constructor (force){
        this.cache = new Collection();
        this.force = force;
    }

    async fetch(id){
        let neighbourhood = await Fetch(`https://data.police.uk/api/${this.force.id}/${id}`);
        let neighbourhoodJSON = await neighbourhood.json();

        let team = new Collection();

        let teamreq = await Fetch(`https://data.police.uk/api/${this.force.id}/${id}/people`);
        let teamreqJSON = await teamreq.json();

        teamreqJSON.forEach(officer => {
                let newOfficer = new Officer({
                    "name":officer.name,
                    "rank":officer.rank,
                    "bio":officer.bio,
                    "contact":officer.contact_details
                });
                team.set(officer.name, newOfficer);
        })
        let nb = new Neighbourhood({
            "id":id,
            "name":neighbourhoodJSON.name,
            "force": this.force,
            "description":neighbourhoodJSON.description,
            "centre":neighbourhoodJSON.centre,
            "team":team
        });

        this.cache.set(id, nb);

        return nb;
    }   
}
module.exports = NeighbourhoodsManager;