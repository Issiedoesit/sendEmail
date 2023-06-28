require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const sendEmail = require("./utils/sendMail")

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

let users = []

app.get("/", (req, res)=>{
    res.send(users)
})

app.get("/:signUpType", (req, res)=>{
    let foundUsers = users.filter((user)=> user.signUpType === req.params.signUpType)

    try {
        res.status(200).send(foundUsers)
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

app.post('/post', (req, res)=>{
    // res.send(req.body)
    let user = {
        name: req.body.name,
        username: req.body.username,
        email:req.body.email,
        signUpType: req.body.signUpType
    } 
    users.push(user)
    res.status(201).send(`User: ${user.username} has been created successfully.`)
})

app.post('/api/sendmail', async (req, res)=>{
    const { sender, email, message, subject } = req.body

    try {
        const sub = subject
        const sender_name = sender
        const msg = message
        const sent_from = email
        const send_to = process.env.EMAIL_USER
        const reply_to = email
        await sendEmail(sub, sender_name, msg, sent_from, send_to, reply_to)
        res.status(200).json({success: true, message: 'Mail sent successfully!'})

    } catch (err) {
        res.status(500).json({message: err.message})
    }

})



app.delete('/delete/:username', (req, res) => {
    let deleteIndex =  users.findIndex((user) => user.username === req.params.username);
    if (deleteIndex !== -1) {
      users.splice(deleteIndex, 1);
      res.status(200).send(`User: ${req.params.username} has been deleted.`);
    } else {
      res.status(404).send('User not found');
    }
 });


const port = process.env.PORT || 3000

app.listen(port, ()=>console.log(`Your app is listening on port ${port}`))