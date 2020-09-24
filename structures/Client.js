const Fetch = require('node-fetch');
const Collection = require('@discordjs/collection');
const ForcesManager = require('./ForcesManager.js');

class Client { // kinda lame but quite essential

  constructor(){
    this.forces = new ForcesManager();
  }

}
module.exports = Client;