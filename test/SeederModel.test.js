const { expect } = require('chai');
const faker = require('faker');
const { SeederModel } = require('../src');
const { User } = require('./db');
const { db } = require('./db/db');

describe('SeederModel', () => {
  let testCollection;
  const userModel = {
    name: faker.name.firstName,
    email: faker.internet.email,
    password: faker.internet.password,
  };
  beforeEach((done) => {
    testCollection = new SeederModel({ name: 'User', model: User });
    done();
  });

  afterEach(async () => {
    testCollection = null;
    await db.dropDatabase();
  });

  it('should take a name and a mongoose schema', () => {
    expect(testCollection.name).to.equal('User');
    expect(testCollection.model).to.equal(User);
  });
  describe('setTemplate', () => {
    it('Should be able to set a default template to create future documents', () => {
      testCollection.setTemplate(userModel);
      const testDocument = testCollection.template();
      const testDocument2 = testCollection.template();

      expect(testDocument).to.have.property('name');
      expect(testDocument).to.have.property('email');
      expect(testDocument).to.have.property('password');

      expect(testDocument).to.not.equal(testDocument2);
    });
    it('Should be able to take an object that overrides or changes properties of that model', () => {
      testCollection.setTemplate(userModel);
      const testDocumet = testCollection.template({ name: 'Jhonny Flepp' });
      expect(testDocumet.name).to.equal('Jhonny Flepp');
    });
  });

  describe('Create, query, cahce document', () => {
    beforeEach(async () => {
      testCollection.setTemplate(userModel);
    });
    afterEach(async () => {
      await db.dropDatabase();
    });

    it('should be able to create a new document and persist to the DB', async () => {
      const createdDoc = await testCollection.create('user1');
      const createdDoc2 = await testCollection.create('admin', { name: 'jesse', email: 'jesse1113@gmail.com', admin: true });

      expect(createdDoc.doc._id).to.exist;
      expect(createdDoc2.doc._id).to.exist;
    });
    it('should be able to track the original data for the document and it\'s corresponding document on the database', async () => {
      expect(testCollection.documents).to.be.an('Object');
      const createdDoc = await testCollection.create('nonAdmin');
      const createdDoc2 = await testCollection.create('admin', { name: 'jesse', email: 'jesse1113@gmail.com', admin: true });

      expect(testCollection.documents).to.haveOwnProperty('nonAdmin');
      expect(testCollection.documents).to.haveOwnProperty('admin');
      expect(testCollection.documents.nonAdmin.doc).to.equal(createdDoc.doc);
      expect(testCollection.documents.admin.doc).to.equal(createdDoc2.doc);
    });
    it('should be able to create/persist multiple documents to the DB', async () => {
      const docArr = await testCollection.createMany(2, 'admins', { admin: true, password: '123' });

      expect(docArr.docs).to.be.an('array');
      expect(docArr.docs).to.have.lengthOf(2);
      expect(testCollection.documents.admins).to.equal(docArr.docs);
    });
    it('should be able to query a collection', async () => {
      const createdDoc = await testCollection.create('nonAdmin');
      const foundDoc = await testCollection.find({ email: createdDoc.doc.email });
      
      expect(foundDoc[0].id).to.equal(createdDoc.doc.id);
    });
    describe('remove and removeAll', () => {
      let user;
      let admins;
      beforeEach(async () => {
        user = await testCollection.create('user');
        admins = await testCollection.createMany(3, 'admins', { admin: true });
      });
      it('remove be able to remove documents form this.documents and the database', async () => {
        await testCollection.remove('admins');
        expect(testCollection.documents.admins).to.be.undefined;
        await testCollection.remove('user');
        expect(testCollection.documents.user).to.be.undefined;
      });
      it('removeAll should remove all documents', async () => {
        await testCollection.removeAll();
        expect(testCollection.documents.admins).to.not.exist;
        expect(testCollection.documents.user).to.not.exist;
      });
    });
  });
});
