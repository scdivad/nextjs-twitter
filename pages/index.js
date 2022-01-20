import React from 'react'
import Link from 'next/link'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      tweets: [],
      currTweetText: '',
    }
  }

  async fetchData() {
    const response = await fetch('http://localhost:3000/api/db')
    const data = await response.json()
    console.log(data.tweets)
    this.setState({user: data.username, tweets: data.tweets})
  }

  async submitLike(likeId) {
    await fetch('http://localhost:3000/api/db', {
      method: 'POST',
      body: JSON.stringify({ likeId }),
      headers: {
          'Content-Type': 'application/json',
      }
    })
    this.fetchData()
  }

  async submitTweet(tweetText) {
    await fetch('http://localhost:3000/api/db', {
      method: 'POST',
      body: JSON.stringify({ tweetText }),
      headers: {
          'Content-Type': 'application/json',
      }
    })
    this.fetchData()
  }

  componentDidMount() {
    this.fetchData()
  }

  showUser() {
    if (this.state.user === '') {
      return <div>Not logged in</div>
    }
    return <div>Current user: {this.state.user}</div>
  }

  showTweetBox() {
    if (this.state.user === '') {
      return <div>Log in to send a tweet!</div>
    }
    return (<div>
      <input
        type='text'
        placeholder='Tweet something!'
        value={this.state.currTweetText} 
        onChange={(e) => this.setState({currTweetText: e.target.value})} 
      />
      <button onClick={() => {
        this.submitTweet(this.state.currTweetText)
      }}>Submit</button>
    </div>)
  }

  render() {
    return (
      <div className='container'>
        <main>
          <Link href='/login'>
            <a>Log in / Switch user </a>
          </Link>
          <br />
          <Link href='/user_history'>
            <a>See user tweet history </a>
          </Link>
          <br />
          <br />
          {this.showUser()}
          <br />
          {this.showTweetBox()}
          <br />
          {
              this.state.tweets.map(tweet => {
                  return (
                      <div key={tweet.id}>
                          {tweet.user}: {tweet.text}
                          <br/>
                          <button onClick={() => {
                            this.submitLike(tweet.id)
                          }}>{tweet.usersLiked.length} likes</button>
                          <br/>
                          <br/>
                      </div>
                  )
              })
          }
        </main>
      </div>
    )
  }
}
