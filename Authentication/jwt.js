//by using JWTs  --> For stateless authentication
// --> When you want to store user info inside the token (e.g., user ID, role)

const express =  require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
const JWT_SECRET = "USER_APP";
const users = [];

app.get("/", function(req,res)
{
    res.sendFile(__dirname + "/index.html");
})

app.post("/signup", function(req,res)    //http://localhost:3000/signup
{
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username : username,
        password : password
    })

    res.json({
        message : "you are signed Up"
    })

    console.log(users);
});

app.post("/signin", function(req,res)         //http://localhost:3000/signin
{
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(user => user.username === username && user.password === password);


    if(foundUser){
        const token = jwt.sign({        //convert their username over to a jwt
            username : foundUser.username,
        },JWT_SECRET ); 

        res.send({
            token
        })
    }
    else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    console.log(users);
});



//using middleware for auth
// function auth(req,res,next)
// {
//     const token = req.headers.token;
//     const decodedData = jwt.verify(token,JWT_SECRET);

//     if(decodedData.username)
//     {
//         req.username = decodedData.username;
//         next();
//     }
//     else{
//         res.status(401).send({
//             message : "Unauthorized",
//         });
//     }   
// }


function auth(req, res, next) {
    const authHeader = req.headers['authorization'];  

    if (!authHeader) {
        return res.status(401).json({ message: "Token missing or malformed" });
    }

    // const token = authHeader.split(" ")[1];
    const token = authHeader;

        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.username)
        {
            req.username = decoded.username;
            next();
        }  
        else{
            res.status(401).send({
                message : "Unauthorized",
            });
        }   
}


app.get("/me",auth, function(req,res)        // http://localhost:3000/me
{ 
    let user = users.find(u => u.username == req.username);
 
    if(user)
    {
        res.json({
            username : user.username,
            password : user.password,
        })
    }
    else{
        res.status(404).send({
            message : "Unauthorized",
        })
    }
});
app.listen(3000);