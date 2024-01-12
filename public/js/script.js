console.log("hello")

fetch("/reddit-post")
    .then((response) => {

        return response.json()
    })
    .then((json) => {
        console.log(json)

        displayPost(json)


    })

    .catch((error) => {
        console.log(error)
    })



//updating the back end-----
function upvote(id) {
    console.log("upvoted!")
    fetch(`/upvote/${id}`)
        .then((response) => {
            return response.json
        })
        .then((json) => {
            console.log(json)

        })


    //updating the front end text (votes)
    const upvoteTag = document.getElementById(id)
    upvoteTag.textContent = Number(upvoteTag.textContent) + 1
}


//-------
function downvote(id) {
    console.log("downvoted!")
    fetch(`/downvote/${id}`)
        .then((response) => {
            return response.json
        })
        .then((json) => {

        })
    const upvoteTag = document.getElementById(id)
    upvoteTag.textContent = Number(upvoteTag.textContent) - 1
}

//------
function getsubreddit(subreddit) {
    fetch(`/subreddit/${subreddit}`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)
            displayPost(json)
        })
        .catch((error) => {
            console.log(error)
        })


}


//functions that uses info

function displayPost(json) {

    const postContainer = document.getElementById("post-container")
    postContainer.innerHTML = ""

    json.forEach((post) => {
        console.log(post)


        //get the post information from json 
        //STEP 1

        const postTitle = post.title
        const postImage = post.image
        const postUpvotes = post.upvotes
        const postAuthor = post.postAuthor
        const postSubreddit = post.subreddit
        const postId = post.id

        console.log(postId)

        ///---------------

        //create HTML elements within JS to show on our webpage (3000)- us index.html to follow an form the elements needed.

        //STEP 2



        let upvoteContainerDiv = document.createElement("div")
        let upvoteButton = document.createElement("button")
        let postUpvoteTag = document.createElement("p")
        let downvoteButton = document.createElement("button")

        let postDivTag = document.createElement("div")

        let postimgTag = document.createElement("img")

        let postInfoTag = document.createElement("div")
        let postTitleTag = document.createElement("h1")

        let postDetails = document.createElement("div")
        let postAuthorTag = document.createElement("p")
        let postSubredditTag = document.createElement("p")

        postimgTag.src = postImage

        //-----------

        upvoteContainerDiv.appendChild(upvoteButton)
        upvoteContainerDiv.appendChild(postUpvoteTag)
        upvoteContainerDiv.appendChild(downvoteButton)

        //Fomat our html- put them where they need to be- appendChild

        //first Div(postDivTag)- adding p,img, and the div (postInfoTag) inside
        //STEP 3

        postDivTag.appendChild(upvoteContainerDiv)
        postDivTag.appendChild(postimgTag)
        postDivTag.appendChild(postInfoTag)


        //second Div (postInfoTag) adding p, and the div (postDetails)
        postInfoTag.appendChild(postTitleTag)
        postInfoTag.appendChild(postDetails)

        //third Div (postDetails) adding p, p. No div inside
        postDetails.appendChild(postAuthorTag)
        postDetails.appendChild(postSubredditTag)


        //giving the postupvotes an ID- same as ID of Post 
        postUpvoteTag.id = postId

        //-------

        //ADD CLASSSES TO HTML ELEMENTS Tag
        //STEP 4

        postDivTag.classList.add("post")
        postUpvoteTag.classList.add("upvotes")
        postimgTag.classList.add("postImage")

        postInfoTag.classList.add("postInfo")
        postTitleTag.classList.add("postTilte")

        postDetails.classList.add("postDetails")
        postAuthorTag.classList.add("postAuthor")
        postSubredditTag.classList.add("postSubreddit")

        upvoteContainerDiv.classList.add("upvote-container")

        //put the post info from json into the element tags (h1,img,p)

        postUpvoteTag.textContent = postUpvotes
        postimgTag.scr = postImage

        postTitleTag.textContent = postTitle
        postAuthorTag.textContent = postAuthor
        postSubredditTag.textContent = postSubreddit

        upvoteButton.textContent = "⬆️"
        downvoteButton.textContent = "⬇️"

        ////----

        ///New single div from html- make a variable (const) to pull the element form the html into js, then add the div (postDivTag) inside. 
        //PostDiv conatains all prior elements and information from above.

        const postContainer = document.getElementById("post-container")
        postContainer.appendChild(postDivTag)


        //add functionality to buttons 
        upvoteButton.setAttribute("onclick", `upvote(${postId})`)
        downvoteButton.setAttribute("onclick", `downvote(${postId})`)


    })

}