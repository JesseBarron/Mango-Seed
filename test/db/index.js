const Article = require('./article');
const Project = require('./project');
const User = require('./user');
const { Seeder } = require('../../src');

const mongooseSeeder = new Seeder();

const models = [
  { name: 'User', model: User },
  { name: 'Article', model: Article },
  { name: 'Project', model: Project },
];

mongooseSeeder.addManyModels(models);

module.exports = {
  Article,
  Project,
  User,
  mongooseSeeder,
};
