const SeederModel = require('./SeederModel');
/**
 * Seeder Class
 * @class Seeder
 * @constructor
 * @property {Object} models - object holding the SeederModel project
 */
class Seeder {
  constructor() {
    this.models = {};
  }
  /**
   * 
   * @param {array} models - Array of onjects containing the names and mongoose model associated with it.
   */
  addManyModels(models) {
    models.forEach((e) => {
      if (!this.models[e.name]) {
        this[e.name] = new SeederModel(e);
        this.models[e.name] = { name: e.name, collection: this[e.name] };
      }
    });
    return this.models;
  }
  /**
   * 
   * @param {object} param0 - containing the name and mongoose schema 
   */
  addModel({ name, model }) {
    if (!this.models[name]) {
      console.log(name, 'HERE')
      this[name] = new SeederModel({ name, model });
      this.models[name] = { name, model: this[name] };
    }
    return this[name];
  }
  /**
   * 
   * @param {strin} name - Name of the model to remove
   */
  removeModel(name) {
    const model = this.name;
    delete this[name];
    delete this.models[name];
    return model;
  }
  /**
   * Removes all the models from this instance
   */
  removeAllModels() {
    const models = Object.keys(this.models);
    for (let i = 0; i < models.length; i++) {
      let modelName = models[i];
      delete this[modelName];
      delete this.models[modelName];
    }
    return this.models;
  }
  /**
   * Returns all the models in this instance.f
   */
  log() {
    return this.models;
  }
}

module.exports = Seeder;
