const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  //res.send(users);
  res.send(JSON.stringify({users},null,4));
  });

// GET by specific ID request: Retrieve all users with specific last name
router.get("/lastName/:lastName",(req,res)=>{
  const lastName = req.params.lastName;
    let filtered_users_by_name = users.filter((user) => user.lastName === lastName);
    res.send(filtered_users_by_name);
  });

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    res.send(filtered_users);
  });

// GET by specific ID request: Retrieve all users with specific DOB
function extractDate(strDate) {
  let [dd,mm,yyyy] = strDate.split('-')
  return new Date(yyyy + "/" + mm + "/" + dd);
}
  
// console.log(sorted_users);
router.get("/sort",(req,res)=>{
  let sorted_users=users.sort(function(a, b) {
      let date1 = extractDate(a.DOB);
      let date2 = extractDate(b.DOB);
          return date1-date2;
        });
  res.send(sorted_users);
});

// POST request: Create a new user
router.post("/",(req,res)=>{
  users.push({"firstName":req.query.firstName,"lastName":req.query.lastName,"email":req.query.email,"DOB":req.query.DOB});
  res.send("The user" + (' ')+ (req.query.firstName) + " Has been added!")
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  if (filtered_users.length > 0) {
      let filtered_user = filtered_users[0];
      let DOB = req.query.DOB;
      let firstName = req.query.firstName;
      let lastName = req.query.lastName;
      //if the DOB changes
      if(DOB) {
          filtered_user.DOB = DOB
      }
      //if the firstName changes
      if(firstName) {
        filtered_user.firstName = firstName
      }
      //if the lastName changes
      if(lastName) {
      filtered_user.lastName = lastName
      }
      users = users.filter((user) => user.email != email);
      users.push(filtered_user);
      res.send(`User with the email  ${email} updated.`);
  }
  else{
      res.send("Unable to find user!");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with the email  ${email} deleted.`);
});

module.exports=router;
