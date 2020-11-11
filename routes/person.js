const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
// test route
// @ route : localhost:3000/persons/test
router.get("/test", (req, res) => {
  res.send("this is a test");
});

//Create and Save a Record of a Model:
//add a Person
// @ route : localhost:3000/persons/addPerson
router.post("/addPerson", (req, res) => {
  const { name, age, favoriteFoods } = req.body;
  const newPerson = new Person({
    name,
    age,
    favoriteFoods,
  });
  newPerson
    .save()
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

//Create Many Records with model.create():
//add manyPersons
// @ route : localhost:3000/persons/addManyPersons
router.post("/addManyPersons", (req, res) => {
  const { arrayOfPeople } = req.body;
  Person.create(arrayOfPeople)
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

//Use model.find() to Search Your Database:
// get all Persons
// @ route : localhost:3000/persons/all
router.get("/all", (req, res) => {
  Person.find()
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

//Use model.findOne() to Return a Single Matching Document from Your Database:
//get one person using food as params
// @ route : localhost:3000/persons/food
router.get("/:food", (req, res) => {
  const { food } = req.params;
  Person.findOne({ favoriteFoods: food })
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

//Use model.findById() to Search Your Database By name
//get one person using his id as params
// @ route : localhost:3000/persons/personId/id
router.get("/personId/:name", (req, res) => {
  const { name } = req.params;
  Person.findById({ name })
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

//Perform Classic Updates by Running Find, Edit, then Save
// get one person by id and add hamburger to his favourite fooods
// @ route : localhost:3000/persons/addHamburger/id
router.put("/addHamburger/:name", (req, res) => {
  const { name } = req.params;

  Person.findById({ name }, (err, person) => {
    if (err) console.log(err);
    person.favoriteFoods.push("Hamburger");
    console.log(person);
    const updatedPerson = new Person(person);
    updatedPerson
      .save()
      .then((Persons) => res.send(Persons))
      .catch((err) => console.log(err));
  });
});

//Perform New Updates on a Document Using model.findOneAndUpdate()
// get person by name and edit his age to 20
// @ route : localhost:3000/persons//editPerson/name
router.put("/editPerson/:name", (req, res) => {
  const { name } = req.params;
  Person.findOneAndUpdate({ name }, { $set: { age: 20 } }, { new: true })
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

//Delete One Document Using model.findByIdAndRemove
// @ route : localhost:3000/persons/delete/id
router.delete("/delete/:_id", (req, res) => {
  const { _id } = req.params;
  Person.findByIdAndRemove({ _id })
    .then((Person) => res.send(Person))
    .catch((err) => console.log(err));
});

//MongoDB and Mongoose - Delete Many Documents with model.remove()
//Delete all the people whose name is “Mary”, using Model.remove()
// @ route : localhost:3000/persons/deleteAll
router.delete("/deleteAll", (req, res) => {
  Person.remove({ name: "Mary" })
    .then((Person) => res.send(Person))
    .catch((err) => console.log(err));
});

//Chain Search Query Helpers to Narrow Search Results
//Find people who like burrito. Sort them by name, limit the results to two documents, and hide their age
// @ route : localhost:3000/persons/like/burrito
router.get("/like/burrito", (req, res) => {
  Person.find({ favoriteFoods: "burrito" })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: false })
    .exec()
    .then((Persons) => res.send(Persons))
    .catch((err) => console.log(err));
});

module.exports = router;
