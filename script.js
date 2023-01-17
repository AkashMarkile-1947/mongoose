const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/testdb";
const User = require("./user");

mongoose.connect("mongodb://localhost:27017/testdb", () => {
    console.log("connected database")
},
e => console.error(e)
);
/*
schema :-  defines the structure of your data looks like(user has name, email, birthdate, etc)
model :-    is the that schema in an actual form that you could use
query :-  query is command against mongoDB databas 
/*have a diff file for each schema*/


async function run() {
  //WAY1
  //creating user obj
  try {
  const user = await User.create({
    name: "Akash",
    age: 26,
    email: "XYZ@gmail.com",
    hobbies: ["cycling", "running"],
    address: {
      street: "Karve Rasta",
      city: "karve Nagar"
    } 
  });
  //updating user obj
  user.name = "joy"
  //saving it to database
  await user.save();
  //console.log(user);
  } catch(e) {
    console.log(e.message);
  }

  //WAY2
  /*const user2 = new User({name: "AKASH", age: 22});
  await user.save();*/
} 
run(); 

async function run2() {
  try {
     const user = await User.deleteOne({name: "joy"});
     const user2 = await User.where("age").lt("26").where("createdAt").equals("2023-01-16T12:20:35.937Z");
     const user3 = await User.where("age").gt("25").limit(2).select("age");
     user3[0].bestFriend = "63c54113b0b3952310d3c1c2";
     await user3[0].save()
     console.log(user, user2, user3);
  } catch (e) {
     console.log(e.message);
  }
}
run2();

