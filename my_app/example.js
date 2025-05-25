//use of middlewares  

const express =  require('express');
const app = express();

app.use(express.json());

//function to check age is valid or not  
// function isOldEnough(age)
// {
//     if(age>= 14)
//     {
//         return true;
//     }
//     else{
//         return false;
//     }
// }

function isOldEnoughMiddleware(req,res,next)
{
    const age = req.query.age;
    if(age >= 14)
    {
        next();
    }
    else{
        res.json({
            msg : "sorry you are not of age yet",
        });
    }
}
// app.get("/ride1", function(req,res)
// {
//     if(isOldEnough(req.query.age))
//     {
//         res.send("you have successfully riden the ride-1");
//     }
//     else{
//         res.json({msg : "sorry you are not of age yet"});
//     }
// })

app.get("/ride1",isOldEnoughMiddleware,function(req,res) 
{
   res.send("you have successfully riden the ride-1 ");
})

app.use(isOldEnoughMiddleware); // this is another way for definig middlewares but it is
                                // works only for the routes defines below it.so you don't
                                // need to seprately mention in every routes.

app.get("/ride2",isOldEnoughMiddleware,function(req,res)
{
   res.send("you have successfully riden the ride-2 ");
})

app.get("/ride3",isOldEnoughMiddleware,function(req,res)
{
   res.send("you have successfully riden the ride-3 ");
})

//learn about error handling middleware 

let errorCount = 0;
app.get("/user", function(req,res)
{
    throw new Error("User not found");
    
    res.status(200).json({msg : "hello"});
});

app.post("/user", function(res,req)
{
    res.status(200).json({msg : "dummy user created"});
});

app.get("/errorCount", function(req,res)
{
    res.status(200).json({errorCount});
});

//error handling middleware
app.use(function(err,req,res,next)
{
    res.status(404).json({msg : "error!"});
    errorCount = errorCount+1;
    console.log(errorCount);
});

app.listen(3000);