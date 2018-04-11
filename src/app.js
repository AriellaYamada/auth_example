import React, { Component } from 'react'
import { View } from 'react-native'
import firebase from 'firebase'
import { Header, Button, Spinner } from './components/common'
import LoginForm from './components/LoginForm'

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCtjl2KumiXT2lFykFoWUZN625_QIqxINM",
      authDomain: "auth-5a1cb.firebaseapp.com",
      databaseURL: "https://auth-5a1cb.firebaseio.com",
      projectId: "auth-5a1cb",
      storageBucket: "auth-5a1cb.appspot.com",
      messagingSenderId: "759621163217"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log out!
          </Button>
        )
        break
      case false:
        return (<LoginForm />)
        break
      default:
        return (<Spinner size= 'large' />)

    }
  }

  render() {
    return(
      <View>
        <Header headerText='Introduction' />
        {this.renderContent()}
      </View>
    )
  }
}

export default App
