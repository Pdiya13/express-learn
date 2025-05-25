const express = require('express');

const app = express(); // express is function that is returing some value and that will be
                       // stored in obj named app.

// console.dir(app);
let port = 3000;

app.listen(port ,()=>
{
    console.log(`app is listening on port ${port}`);
});

app.get("/", (req,res)=>
{
    res.send("you contacted root path");
});

app.get("/apple",(req,res)=>
{
    res.send("you contacted apple path");
});

app.get("/orange",(req,res)=>
{
    res.send("you contacted orange path");
});

// app.get("*", (req,res)=>
// {
//     res.send("not valid path");
// });


// app.get("/:username/:id",(req,res)=>       // path parameters
// {
//     console.log(req.params);
//     res.send("hello,i am root");
// })


app.get("/:username/:id",(req,res)=> //path parameters
{
        let {username , id } = req.params;
        res.send(`Welcome, to the page of @${username}`);
})


// app.get("/search",(req,res)=>  //query params   localhost:3000/search?q=apple&color=green
// {
//     console.log(res.query);
//     res.send("no results");
// })

app.get("/search",(req,res)=>  //localhost:3000/search?q=apple&color=green
{
    let {q,color} = req.query;
    res.send(`search result for query: ${q} ${color}`);
})