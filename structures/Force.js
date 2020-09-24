const Collection = require('@discordjs/collection');
const Base = require('../index.js');
const NeighbourhoodsManager = require('./NeighbourhoodsManager.js');

class Force {

  constructor(data){
    this.id = data.id;
    this.name = data.name;
    this.desc = data.description;
    this.tel = data.telephone;
    this.engagement = data.engagement;
    this.url = data.url;
    this.senior_officers = data.seniors;

    this.neighbourhoods = new NeighbourhoodsManager(this);
  }

}
module.exports = Force;