const { Seeder, SeederModel } = require('../src');
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
  const models = [
    { name: 'User', model: User },
    { name: 'Article', model: Article },
    { name: 'Project', model: Project },
  ];

  beforeEach(() => {
    testSeeder = new Seeder();
  });

  afterEach(() => {
    testSeeder = null;
  });

  it('Should be have a property called collection that\'s an empty array', () => {
    expect(testSeeder).to.haveOwnProperty('models');
  });

  describe('addManyModels and removaAllmodels', () => {
    beforeEach(() => {
      testSeeder.addManyModels(models);
    });

    it('log should return all the models of the Seeder instance', () => {
      expect(Object.keys(testSeeder.log()).length).to.equal(3);
    })
    it('addManyModels should be able to add many models to the Seeder class', () => {
      const modelNames = Object.keys(testSeeder.models);
      expect(modelNames.length).to.equal(3);

      modelNames.forEach((name) => {
        expect(testSeeder.models[name]).to.exist;
        expect(testSeeder.models[name].collection).to.be.an.instanceof(SeederModel);
        expect(testSeeder[name]).to.exist;
      });
    });
    it('removeAllModels should remove all models from this.models and the class', () => {
      testSeeder.removeAllModels();
      const modelNames = Object.keys(testSeeder.models);
      expect(modelNames.length).to.equal(0);
      expect(testSeeder[models[0].name]).to.not.exist;
    });
    it('should persist docs to the database', async () => {
      const userTemplate = {
        name: 'jesse',
        email: 'jesseB@goo',
        password: '123',
      };
      testSeeder.User.setTemplate(userTemplate);
      await testSeeder.User.create('user');
      expect(testSeeder.User.documents.user.doc.email).to.equal(userTemplate.email);
    })
  });
  describe('addModel and removeModel', () => {
    beforeEach(() => {
      testSeeder.addModel(models[0]);
    });

    it('addModel should be able to add a single collection to the Seeder class', () => {
      const modelNames = Object.keys(testSeeder.models);
      expect(modelNames.length).to.equal(1);

      modelNames.forEach((name) => {
        expect(testSeeder.models[name].name).to.equal(models[0].name);
        expect(testSeeder.models[name].model).to.be.an.instanceof(SeederModel);
        expect(testSeeder[name]).to.exist;
      });
    });
    it('removeModel should remove a specific collection', () => {
      testSeeder.removeModel(models[0].name);
      const modelNames = Object.keys(testSeeder.models);
      expect(modelNames.length).to.equal(0);
      expect(testSeeder[models[0].name]).to.not.exist;
    });
  });
});
