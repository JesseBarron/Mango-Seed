
# Mango-Seed    
[![Build Status](https://travis-ci.org/JesseBarron/Mango-Seed.svg?branch=master)](https://travis-ci.org/JesseBarron/Mango-Seed)

Seeder is a simple utility that allows for quick an easy seeding when writing unit test when using mongoose!

## Setup:
initialize a new Instance of Seeder and set the mongoose models.
```javascript
const mongoose = require('mongoose');
const Seeder = require('Mango-Seed');

const url = 'mongodb://localhost:27017/SeederTest';
mongoose.connect(url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));


const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

const seeder = new Seeder();
seeder.addModel('user', User);
```
Here we passed the string 'user'  to the seeder instance so we can access it like so:
```javascript
seeder.user.create('admin', {admin: tue})
```
## API <hr/>
 ### Templates:
 In order to simplify the process of creating unique users
```javascript
/*
 * Hard-coding Values:
 * Hard-coding fields and values is the easiest way to set a teamplate.
 
 * However if you have constrains in your schema like unique emails, this could throw a validation error if documents are created without changing the email. See create for that.
*/
const userTemplate = {
  name: 'Mango',
  email: 'mango@tree.coco',
  password: 'chamoy',
}

/* Recommended way using Faker.js*/
/*
 * This ensures that every time you create a new document it's unique and won't throw a validation error. In addition, this would make using the utility's .createMany() method a lot seasier to use.
*/
const userTemplate = {
  name: faker.name.firstName,
  email: faker.internet.email,
  password: faker.internet.password,
}

//Set the template
seeder.user.setTemplate(userTemplate)
```
### Create Document:
```javascript
/**
 * creates - Persists a document to the database and saves it to this.documents
 * @param {string} name - Used to keep track of this document
 * @param {object} data - Properties you'd like to override from the model
 * @param {object} options - Needs work
 */
const tajin = await seeder.user.create()
//Returns { name: 'created document id', doc: {'Newly created document'}}

//With name and data passed
/*
 * The name passed in is set to the models documents object and makes it easy to recieve the document via seeder.user.documents.name
 
 * The second argument overiddes the properties set on the template
*/
const tajin = await seeder.user.create('admin', {admin: tue, name: 'add-man'})
//Returns { name: 'admin', doc:{ admin: ture, name: 'add-man' }}

/*
 * With options passed
 * with the cache option set to false, the method won't cache the created document to the seeder.user.documents object.
*/
const tajin = await seeder.user.create('admin', {admin: tue, name: 'add-man'}, {cache: false});
//returns {'created document'}
```
### Create Many Documents:
```javascript
/**
   * createMany - Creates a number of documents
   * @param {number} num - Number of documents to create
   * @param {string} name - Name of the property to track the array
   * @param {object} data - Properties you'd like to override from the model object
   * @param {object} options - Needs work
   */
  const userArr = await seeder.user.createMany(2, 'admins', {admin: true});
  // Returns {name: 'admins', docs:[{documents}]
```
### Find Document:
```javascript
/**
 * find - Query for a document from the database
 * @param {object} data - Parameters to query the db with
 */
  const foundMango = seeder.user.find({ email: 'mango@tree.coco' })
  //returns {'document form the database'}
```
### Remove Documents:
```javascript
/**
 * remove - removes domcument from this.documents and the database
 * @param {string} name - name of the documents you wan't to get rid of
 */
  seeder.user.remove(admins);
  //Deletes the documets and returns them
  seeder.user.removeAll();
  //Deletes all documents returns nothing
```

## Thanks!!
Any questions or feedback could be sent to my email jessebarrondev@gmail.com.

## TODOS
- Write examples.
- expand to make it useful for sequelize.
