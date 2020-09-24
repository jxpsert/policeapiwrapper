const Collection = require('@discordjs/collection');
const Base = require('../index.js');
const NeighbourhoodsManager = require('./NeighbourhoodsManager.js');

class Neighbourhood {

  constructor(data){
    this.id = data.id;
    this.name = data.name;
    this.force = data.force;
    this.desc = data.description;
    this.centre = data.centre;

    this.team = data.team;
  }

}
module.exports = Neighbourhood;