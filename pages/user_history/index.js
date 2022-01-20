import React from 'react'

export default class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userForHistory: '',
      tweets: [],
    }
  }

  async fetchTweets() {
    const response = await fetch('http://localhost:3000/api/db')
    const data = await response.json()
    this.setState({tweets: data.tweets.filter(tweet => tweet.user === this.state.userForHistory)})
  }

  render() {
    return (
      <div className='container'>
        <main>
          <input
            type='text'
            placeholder='User'
            value={this.state.userForHistory} 
            onChange={e => this.setState({userForHistory: e.target.value})} 
          />
          <button onClick={() => {
            this.fetchTweets()
          }}>Search</button>
          {
              this.state.tweets.map(tweet => {
                  return (
                      <div key={tweet.id}>
                          {tweet.user}: {tweet.text}
                          <br/>
                          <div>{tweet.usersLiked.length} likes</div>
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
