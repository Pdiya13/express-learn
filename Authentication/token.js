//by using token --> When the server stores user state

const express =  require("express");
const app = express();

app.use(express.json());

const users = [];

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post("/signup", function(req,res)    //http://localhost:3000/signup
{
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username : username,
        password : password
    })

    res.json({
        message : "you are signed in"
    })

    console.log(users);
});

app.post("/signin", function(req,res)         //http://localhost:3000/signin
{
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(user => user.username == username);

    if(foundUser){
        const token = generateToken();
        foundUser.token = token;
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

app.get("/me", function(req,res)        // http://localhost:3000/me
{
    const token = req.headers.token;
    let user = users.find(u=> u.token == token);

    if(user)
    {
        res.json({
            Username : user.username,
            Password : user.password,
        })
    }
    else{
        res.status(404).send({
            message : "Unauthorized",
        })
    }
});
app.listen(3000);