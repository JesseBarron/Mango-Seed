const { Seeder, SeederCollection } = require('../src');
const {
  User,
  Article,
  Project,
} = require('./db');
const {
  expect,
} = require('chai');

describe('Seeder Class', () => {
  let testSeeder;
  const collections = [
    { name: 'User', collection: User },
    { name: 'Article', collection: Article },
    { name: 'Project', collection: Project },
  ];

  beforeEach(() => {
    testSeeder = new Seeder();
  });

  afterEach(() => {
    testSeeder = null;
  });

  it('Should be have a property called collection that\'s an empty array', () => {
    expect(testSeeder).to.haveOwnProperty('collections');
  });

  describe('addManyCollections and removaAllCollections', () => {
    beforeEach(() => {
      testSeeder.addManyCollections(collections);
    });

    it('log should return all the collections of the Seeder instance', () => {
      expect(Object.keys(testSeeder.log()).length).to.equal(3);
    })
    it('addManyCollections should be able to add many collections to the Seeder class', () => {
      const collectionNames = Object.keys(testSeeder.collections);
      expect(collectionNames.length).to.equal(3);

      collectionNames.forEach((name) => {
        expect(testSeeder.collections[name]).to.exist;
        expect(testSeeder.collections[name].collection).to.be.an.instanceof(SeederCollection);
        expect(testSeeder[name]).to.exist;
      });
    });
    it('removeAllCollections should remove all collections from this.collections and the class', () => {
      testSeeder.removeAllCollections();
      const collectionNames = Object.keys(testSeeder.collections);
      expect(collectionNames.length).to.equal(0);
      expect(testSeeder[collections[0].name]).to.not.exist;
    });
  });
  describe('addCollection and removeCollection', () => {
    beforeEach(() => {
      testSeeder.addCollection(collections[0]);
    });

    it('addCollection should be able to add a single collection to the Seeder class', () => {
      const collectionNames = Object.keys(testSeeder.collections);
      expect(collectionNames.length).to.equal(1);

      collectionNames.forEach((name) => {
        expect(testSeeder.collections[name].name).to.equal(collections[0].name);
        expect(testSeeder.collections[name].collection).to.be.an.instanceof(SeederCollection);
        expect(testSeeder[name]).to.exist;
      });
    });
    it('removeCollection should remove a specific collection', () => {
      testSeeder.removeCollection(collections[0].name);
      const collectionNames = Object.keys(testSeeder.collections);
      expect(collectionNames.length).to.equal(0);
      expect(testSeeder[collections[0].name]).to.not.exist;
    });
  });
});
