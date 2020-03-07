// require mongoose package
const mongoose = require('mongoose');

// connect to the MongoDB database servers via mongoose + Access personAndFruitsDB database
mongoose.connect("mongodb://localhost:27017/personAndFruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose will create this database if it doesn't exist.

// Schema for Person
const PersonSchema = mongoose.Schema({
  name: String,
  age: Number
});

// Schema/Structure for Fruit Document
const FruitSchema = mongoose.Schema({
  name: String,
  rating: Number,
  review: String
})

// Person Model
const Person = mongoose.model("person", PersonSchema);
// person will be converted "people" collection by mongoose (using lodash?)
// only Document(s) that follow the PersonSchema will be added to "people" collection

// Fruit Model
const Fruit = mongoose.model("fruit", FruitSchema);
// fruit will be converted to "fruits" collection by Mongoose
// Only documents that follow the FruitSchema will be added to "fruits" collection


// Adding document(s)
const person = new Person({
  name: "John",
  age: 25
});

const fruit = new Fruit(
  {
    name: "Apple",
    rating: 7,
    review: "An apple a day keeps the doctor away."
  }
);

person.save(); //adds "John" to "people" collection in personAndFruitsDB database
fruit.save();  // adds "Apple" to "fruits" collection in personAndFruitsDB database
// End of adding documents.
