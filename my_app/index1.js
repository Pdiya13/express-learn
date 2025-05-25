const express = require('express');
const app = express();

app.use(express.json());

const users = [
    {
      id: 1,
      name: "john",
      kidneys: [{ healthy: false },{healthy: true }],
    },
    {
      id: 2,
      name: "alice",
      kidneys: [{ healthy: true }, { healthy: true }],
    },
    {
      id: 3,
      name: "john",
      kidneys : [],

    }
  ];

app.get("/", function(req,res)
{
    const johnkidneys = users[0].kidneys;
    const numberOfKidneys = users[0].kidneys.length;
    const numberOfHealthyKidneys = johnkidneys.filter(kidney => kidney.healthy).length;
    const numOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.send(`Number of kidenyes are : ${numberOfKidneys}, Number of healthy kidenyes are : ${numberOfHealthyKidneys},  Number of Unhealthy kidenyes are : ${numOfUnhealthyKidneys}`);
});

app.get("/:id", function(req,res)
{
    const userIdToFind = parseInt(req.params.id);
    console.log(userIdToFind);
    const user = users.find(u => u.id === userIdToFind);
    console.log("hello");
    if (user) {
        const numberOfKidneys = user.kidneys.length;
        const numberOfHealthyKidneys = user.kidneys.filter(kidney => kidney.healthy).length;
        const numOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
        res.json({ user,
            numberOfKidneys,
            numberOfHealthyKidneys,
            numOfUnhealthyKidneys,
        }); 
      } else {
        res.status(404).json({ message: "User not found" });
      }
});

app.post("/:id", function(req,res)
{
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    console.log("hello");
    if (user) {
        const { h } =  req.body;
        // const n = user.kidneys.length;
        // user.kidneys[n] = {healthy : h};
        user.kidneys.push({ healthy: h });  // using push instead of array index
        res.json(user); 
      } else {
        res.status(404).json({ message: "User not found" });
      }
});

app.put("/:id", function(req,res)
{
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if(user)
    {
      if(findUnhealthyKidney(user))
      {
          for(let i=0;i<user.kidneys.length;i++)
          {
              user.kidneys[i].healthy = {healthy : "true"};
          }
          res.json(user);
      }
      else{
        res.status(411).json({msg : "You have no unhelathy kidneys"});
      }
    }
    else {
        res.status(404).json({ message: "User not found" });
      }
});


app.delete("/:id", function(req, res) {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const user = users[index];
  if(findUnhealthyKidney(user))
  {
    const newKidneys = [];
    for (let i = 0; i < user.kidneys.length; i++) {
      if (user.kidneys[i].healthy) {
        newKidneys.push({ healthy: true });
      }
    }

    user.kidneys = newKidneys;

    res.json({ msg: "Unhealthy kidneys deleted", user });
  }
  else{
    res.status(411).json(
      {
        msg : "You have no Unhealthy Kidneys",
      }
    ) 
  }
  
});

//find that there is atleast one unhealty kidheny
function findUnhealthyKidney(user){
  let UnhealthyKidneys = false;
  for(let i =0;i<user.kidneys.length;i++)
  {
    if(!user.kidneys[i].healthy)
    {
      UnhealthyKidneys = true
    }
  }

  return UnhealthyKidneys;
}

app.listen(3000);