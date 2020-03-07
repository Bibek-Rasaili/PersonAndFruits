// require mongoose package
const mongoose = require('mongoose');

// connect to the MongoDB database servers via mongoose + Access personAndFruitsDB database
mongoose.connect("mongodb://localhost:27017/personAndFruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose will create this database if it doesn't exist.

// Schema/Structure for Fruit Document
const fruitSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, " Fruit MUST have a name. "]
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  review: String
})

// -- fruitSchema has to be placed on above/before personSchema --

// Schema for Person
const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ops! Name field empty."]
  },
  age: Number,

  favouriteFruit: fruitSchema //added to establish relationship between "Person" and "Fruit"

});

// Person Model
const Person = mongoose.model("person", personSchema);
// person will be converted "people" collection by mongoose (using lodash?)
// only Document(s) that follow the PersonSchema will be added to "people" collection

// Fruit Model
const Fruit = mongoose.model("fruit", fruitSchema);
// fruit will be converted to "fruits" collection by Mongoose
// Only documents that follow the FruitSchema will be added to "fruits" collection


// Adding document(s)
const fruit = new Fruit(
  {
    name: "Pineapple",
    rating: 9,
    review: "Tasty and Healthy."
  }
);

// fruit document placed above (to be accessed) - SAME HAD to be done for Schema
// otherwise Error:
// Cannot access 'fruitSchema' before initialization
// Cannot access 'fruit' before initialization
const person = new Person({
  name: "Amy",
  age: 28,
  favouriteFruit: fruit //relationship
});


// person.save(); //adds "John" to "people" collection in personAndFruitsDB database
// fruit.save();  // adds "Apple" to "fruits" collection in personAndFruitsDB database
// End of adding documents.


// Challenge:
// Add a new fruit + set it as John's favouriteFruit

// Add new fruit
const watermelon = new Fruit({
  name: "Watermelon",
  rating: 9,
  review: "Refreshing and Hydrating"
});

watermelon.save();

// because john is already created, we have to UPDATE not Create.
// Model.updateOne() to update (add) John's favouriteFruit
Person.updateOne(
  {
    name: "John" //Condition
  },
  {
    favouriteFruit: watermelon //set "John"s favouriteFruit to watermelon
  },
  function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("Successully added John's favouriteFruit.");
    }
  }
);
// End of Challenge







// //
// const john = new Person({
//   name: "John",
//   age: 25
// });
// const apple = new Fruit({
//   name: "Apple",
//   rating: 7,
//   review: "An apple a day keeps the doctor away."
// })
// john.save();
// apple.save();
// //
