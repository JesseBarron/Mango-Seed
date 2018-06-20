const defaultOptions = {
  cache: true,
};
/**
 * Create a new SeederCollection
 * @class
 * @param {object} model - Name and mongoose model.
 * @param {string} model.name - Name of the model used to retrieve this instance from Seeder class.
 * @param {object} model.model - The mongoose model used to add and remove documents using this class.
 * @property {object} SeederModel.documetns - Cache of documents created using this class.
 * Meant to be used to keep track of created documents.
 * @property {object} SeederModel.model - A template to make more documents.
 * {name: 'example', password: '123'}, future documents will be exactly the same as this
 * This could lead to conflicts if a field is restricted to be unique,
 * it's highly recommended to use Faker.js to create unique fields.
 */
class SeederModel {
  constructor(model) {
    if (!model.name) {
      throw new Error('addmodel must have a name addmodel(name, model)');
    }
    if (!model.model) {
      throw new Error('addmodel must be given a model addmodel(name, model)');
    }
    this.documents = {};
    this.template = null;
    this.name = model.name;
    this.model = model.model;
  }
  /**
  * Set this.model
  * @method setModel
  * @param {object} model - An object with properties and values
  * that complies to this models constraints
  * @returns {function} - This function is used in create to generate new data 
  * to save to the databse
  */
  setTemplate(template) {
    this.template = (data) => {
      const newDocument = {};
      const templateKeys = Object.keys(template);
      templateKeys.forEach((e) => {
        newDocument[e] = (typeof template[e] === 'function') ? template[e]() : template[e];
      });
      return Object.assign({}, newDocument, data);
    };
  }
  /**
   * creates - Persists a document to the database and saves it to this.documents
   * @param {string} name - Used to keep track of this document
   * @param {object} data - Properties you'd like to override from the model
   * @param {object} options - Needs work
   */
  async create(name, data, options = defaultOptions) {
    try {
      const docData = this.template(data);
      const createdDoc = await this.model.create(docData);
      if (options.cache) {
        const docName = name || createdDoc._id;
        this.documents[docName] = { doc: createdDoc, data: docData };
        return { name: docName, doc: createdDoc, data: docData };
      }
      return createdDoc;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  /**
   * createMany - Creates a number of documents
   * @param {number} num - Number of documents to create
   * @param {string} name - Name of the property to track the array
   * @param {object} data - Properties you'd like to override from the model object
   * @param {object} options - Needs work
   */
  async createMany(num, name, data, options = { cache: false }) {
    const docArray = [];
    for (let i = 0; i < num; i++) {
      docArray.push(await this.create(null, data, options));
    }
    this.documents[name] = docArray;
    return { name, docs: docArray };
  }
  /**
   * find - Query for a document from the database
   * @param {object} data - Parameters to query the db with
   */
  async find(data) {
    try {
      const result = await this.model.find(data);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  /**
   * remove - removes domcument from this.documents and the database
   * @param {string} name - name of the documents you wan't to get rid of
   */
  async remove(name) {
    const document = this.documents[name];
    if (Array.isArray(document)) {
      document.forEach(async (e) => {
        await this.model.findOneAndRemove(e._id);
      });
    } else {
      this.model.findOneAndRemove(document._id);
    }
    delete this.documents[name];
    return document;
  }
  /**
   * Removes all documets from the database and the cache
   */
  async removeAll() {
    const allDocProps = Object.keys(this.documents);
    allDocProps.forEach(async (e) => {
      await this.remove(e);
    });
  }
}

module.exports = SeederModel;
