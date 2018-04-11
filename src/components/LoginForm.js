import React, { Component } from 'react'
import firebase from 'firebase'
import { Text } from 'react-native'
import { Card, CardSection, Button, Input, Spinner } from './common'

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false }

  onButtonPress() {
    const { email, password } = this.state
    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.loginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.loginSuccess.bind(this))
          .catch(() => {this.loginFail.bind(this)})
      })
  }

  loginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    })
  }

  loginFail() {
    this.setState({
      loading: false,
      error: 'Authentication error!'
    })
  }

  renderButton() {
    if(this.state.loading) {
      return <Spinner size='small'/>
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    )
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label= "Email"
            placeholder= 'email@email.com'
            value= { this.state.email }
            onChangeText= { email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            label= "Password"
            placeholder= 'password'
            value= { this.state.password }
            onChangeText= { password => this.setState({ password })}
            secureTextEntry = {true}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          { this.state.error }
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}
export default LoginForm
