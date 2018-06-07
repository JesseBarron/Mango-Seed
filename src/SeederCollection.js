class SeederCollection {
  constructor(collection) {
    if (!collection.name) {
      throw new Error('addCollection must have a name addCollection(name, collection)');
    }
    if (!collection.collection) {
      throw new Error('addCollection must be given a collection addCollection(name, collection)');
    }
    this.model = null;
    this.name = collection.name;
    this.collection = collection.collection;
  }
  setModel(model) {
    this.model = () => model;
  }
}

module.exports = SeederCollection;
