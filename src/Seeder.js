const SeederCollection = require('./SeederCollection');

class Seeder {
  constructor() {
    this.collections = {};
  }
  addManyCollections(collections) {
    collections.forEach((e) => {
      if (!this.collections[e.name]) {
        this[e.name] = new SeederCollection(e);
        this.collections[e.name] = { name: e.name, collection: this[e.name] };
      }
    });
    return this.collections;
  }
  addCollection({ name, collection }) {
    if (!this.collections[name]) {
      this[name] = new SeederCollection({ name, collection });
      this.collections[name] = { name, collection: this[name] };
    }
    return this[name];
  }
  removeCollection(name) {
    const collection = this.name;
    delete this[name];
    delete this.collections[name];
    return collection;
  }
  removeAllCollections() {
    const collections = Object.keys(this.collections);
    for (let i = 0; i < collections.length; i++) {
      let collName = collections[i];
      delete this[collName];
      delete this.collections[collName];
    }
    return this.collections;
  }
  log() {
    return this.collections;
  }
}

module.exports = Seeder;
