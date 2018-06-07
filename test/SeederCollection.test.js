const { expect } = require('chai');
const faker = require('faker');
const { Seeder, SeederCollection } = require('../src');
const { User } = require('./db');
const { db } = require('./db/db');

describe('TestCollection', () => {
  let testCollection;
  const userModel = {
    name: faker.name.firstName,
    email: faker.internet.email,
    password: faker.internet.password,
  };
  beforeEach(() => {
    testCollection = new SeederCollection({ name: 'User', collection: User });
  });

  afterEach(() => {
    testCollection = null;
    db.dropDatabase();
  });

  it('should take a name and a mongoose schema', () => {
    expect(testCollection.name).to.equal('User');
    expect(testCollection.collection).to.equal(User);
  });
  describe('setModel', () => {
    it('Should be able to set a default model to create future documents', () => {
      testCollection.setModel(userModel);
    });
    it('Should be able to take a modifier object that modifies the model for that instance')
  });
  describe('Create, query, cahce document', () => {
    it('should be able to track the original data for the document and it\'s corresponding document');
    it('should be able to create a new document and persist to the DB');
    it('should be able to create/persist multiple documents to the DB');
    it('should be able to query a collection');
    it('should be able to remove documents form the database');
  });
});
