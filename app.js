const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '/public')))


/*

1. Setup a basic UI - user interface
.mock out in html
2. Create posts (seeding)
3. Display post on webpage

    a. create path to send data-- make a route in backend (app.js)

    app.get("/reddit-post", (req, res) => {
    //name of array with info (post)
    res.send(post)
})
    b. fetch data - creating fetch on front end (script.js)

    c. create html elements

4. Be able to upvote/downvote post 

a.Add arrow button to our post

b. When clcking button it should add one to upvote, subtract 1 if downvoted.

    1.create an onclick function for buttons

    2. post to our express app
        a. figure out what post is beign updated
        b. create routes to handle the request

        c. update the values 

    3. create routes for upvoting and downvoting 
    4. convert string to number
    5. Update upvote value in array
c. hook up our buttons


5. View specific subreddits
a. add navbar to html to view subreddit
b. create route that sends over the post - express 
c. display post from the subreddit on webpage




Last: CSS

*/



let post = [
    {
        "id": "1",
        "upvotes": "1000",
        "image": "https://smartasset.com/wp-content/uploads/sites/2/2016/01/economics_of_the_lottery_1-1.jpg",
        "title": "$100 Billion dollar lottery winner",
        "author": "Autumn",
        "subreddit": "News"

    },

    {
        "id": "2",
        "upvotes": "100",
        "image": "https://media.gq.com/photos/654ab23e6d9c6b425a8b3c70/master/pass/GQ1223_Andre_01.png",
        "title": "Andrea new album",
        "author": "Raven",
        "subreddit": "Music"

    },

    {
        "id": "3",
        "upvotes": "5000",
        "image": "https://media.geeksforgeeks.org/wp-content/uploads/20230911173805/What-is-Artiificial-Intelligence(AI).webp",
        "title": "New AI features",
        "author": "Denise",
        "subreddit": "Tech"

    },

    {
        "id": "4",
        "upvotes": "10000",
        "image": "https://www.skinps.com/wp-content/uploads/2018/09/photo-sandra-lee-dr-pimple-popper.jpg",
        "title": "Pimple Popper",
        "author": "Emerald",
        "subreddit": "Oddly Satisfying"

    }

]

// Path to the file we want to send up for user to see-finds html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/index.html'))
})

//create route that sends all post to front end (script.js) to use with fetch.
app.get("/reddit-post", (req, res) => {

    //name of array with info (post)
    res.send(post)
})

//------

//create route for uploading
app.get("/upvote/:id", (req, res) => {

    const id = req.params.id

    for (let i = 0; i < post.length; i++) {
        if (post[i].id === id) {
            let upvotes = Number(post[i].upvotes) //turning id into a number
            upvotes = upvotes + 1
            post[i].upvotes = upvotes.toString() //converting back to string
        }
    }

})

//create route for downloading
app.get("/downvote/:id", (req, res) => {
    const id = req.params.id

    for (let i = 0; i < post.length; i--) {
        if (post[i].id === id) {
            let downvotes = Number(post[i].upvotes)
            downvotes = downvotes - 1
            post[i].upvotes = downvotes.toString()

        }
    }

})

//can only do res.send once
app.get("/subreddit/:subreddit", (req, res) => {
    const subreddit = req.params.subreddit
    const subredditPost = []

    for (let i = 0; i < post.length; i++) {
        if (post[i].subreddit === subreddit) {
            subredditPost.push(post[i])

        }
    }
    res.send(subredditPost)
})

app.listen(3000)
console.log("expresss is running")