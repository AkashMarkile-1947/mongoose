/*user schema*/
const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
   street: String,
   city: String,
})
/*
findOneAndUpdate or updateOne UpdateMany do not follow a validation 
so it's always recomended to  use simple method and use .save() on it

User.findById().save()
*/


/*defining a new schema*/
const userSchema = new mongoose.Schema({
   name: String,
   age: {
      type: Number,
      min: 1,//setting a minimum value for a prop
      max: 100, //setting a maximum value for prop
      /*CUSTOM VALIDTOR FOR A FIELD*/
      validate: {
         validator: v => v % 2 === 0,
         message: props => `${props.value} is not a even number`,
      }
   }, 
   email: {
      type: String,//type
      minLength: 10,//setting a string minimum length
      required: true,//making a field required
      lowercase: true,//tranforming field data into lowercase
   },
   createdAt: {
      type: Date,
      immutable: true,//making a prop immutable
      default: new Date() //assinging a default value
   },
   updatedAt: Date,
   bestFriend: {type: mongoose.SchemaTypes.ObjectId,
   ref: "User"
   },
   hobbies: [String],
   /*address: {
      street: String,
      city: String, 
   }*/
   address: addressSchema,
});



/*defining a new model for existing schema*/
module.exports = mongoose.model("User", userSchema);