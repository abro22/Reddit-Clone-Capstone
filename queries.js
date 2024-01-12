const Pool = require('pg').Pool

const pool = new Pool({

    user: 'me',
    host: 'localhost',
    database: 'reddit',
    password: 'password',
    port: 5432

})

const getPosts = (request, response) => {

    pool.query('SELECT * FROM posts', (error, results) => {

        if (error) {
            throw error
        }

        response.status(200).json(results.rows)
    })

}

const getSubreddits = (request, response) => {

    const subreddit = request.params.subreddit

    pool.query('SELECT * FROM posts WHERE subreddit = $1', [subreddit], (error, results) => {

        if (error) {
            throw error
        }
        response.status(200).json(results.rows)

    })
}

const upvote = (req, res) => {
    const id = request.params.id
    pool.query('UPDATE posts SET upvotes = upvotes + 1 WHERE id = $1', [id], (error, results) => {

        if (error) {
            throw error
        }
        response.status(200).send(`post ID:${id} was upvoted`)

    })
}

const downvote = (req, res) => {
    const id = request.params.id
    pool.query('UPDATE posts SET upvotes = upvotes - 1 WHERE id = $1', [id], (error, results) => {

        if (error) {
            throw error
        }
        response.status(200).send(`post ID:${id} was downvoted`)

    })
}

module.exports = {
    getPosts,
    getSubreddits,
    upvote,
    downvote
}