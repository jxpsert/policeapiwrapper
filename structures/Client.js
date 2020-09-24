const Fetch = require('node-fetch');
const Collection = require('@discordjs/collection');
const Force = require('./Force.js');
const ForcesManager = require('./ForcesManager.js');

class Client {

  constructor(){
    this.forces = new ForcesManager();
  }

  async login(){

  }

}
module.exports = Client;