import { db } from '../../../data/db';

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(db);
    }
    if (req.method === 'POST') {
        // console.log('post: ' + JSON.stringify(req.body)) // debugging
        if ('username' in req.body) {
            db.username = req.body.username
        }
        if ('likeId' in req.body) {
            const likeId = req.body.likeId;
            for (let i = 0; i < db.tweets.length; i++) { // I tried converting this into a ranged based for loop -- it didn't work
                if (db.tweets[i].id === likeId) {
                    if (!db.tweets[i].usersLiked.includes(db.username)) {
                        db.tweets[i].usersLiked.push(db.username);
                    } else {
                        // Removes the user from the array of usersLiked
                        db.tweets[i].usersLiked = db.tweets[i].usersLiked.filter(user => user !== db.username);
                    }
                    break
                }
            }
        }
        if ('tweetText' in req.body && req.body.tweetText) {
            const newTweet = {
                id: Date.now(),
                user: db.username,
                text: req.body.tweetText,
                usersLiked: []
            }
            db.tweets.push(newTweet)
        }
        res.status(201).json(db)
    }
}