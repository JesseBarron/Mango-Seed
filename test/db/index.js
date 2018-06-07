const Article = require('./article');
const Project = require('./project');
const User = require('./user');
const { Seeder } = require('../../src');

const mongooseSeeder = new Seeder();

const collections = [
  { name: 'User', collection: User },
  { name: 'Article', collection: Article },
  { name: 'Project', collection: Project },
];

mongooseSeeder.addManyCollections(collections);

module.exports = {
  Article,
  Project,
  User,
  mongooseSeeder,
};
