import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignIn from './pages/signIn/signin';
import SignUp from './pages/signUp/signup';
import Header from './components/Header/header';
//import SuccessPage from './pages/SuccessPage/SuccessPage';
import './App.css';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
    }


    unsubscribeFromAuth = null

    componentDidMount(){
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser: {
              id: snapShot.id,
              ...snapShot.data()
              }
            });
           // console.log(this.state)
          });
          
        }

        this.setState({ currentUser: userAuth });
      });
    }

    componentWillUnmount() {
      this.unsubscribeFromAuth();
    }

    render(){
      return(
        <div className='App'>
        <Header currentUser={this.state.currentUser} />
        <Switch>
        <Route exact path='/' component={Homepage} />
        
        <Route exact path='/signin' render={() => 
          this.state.currentUser ? (
            <Redirect to='/' />
          ) : (
            <SignIn />
          )
        } 
        />

        <Route exact path='/signup' render={() => 
          this.state.currentUser ? (
            <Redirect to='/' />
          ) : (
            <SignUp />
          )
        } 
        />

        </Switch>

        </div>
      );

    }
  }

export default App;

// , () => {
//   console.log(this.state);
// }

// <Route  path='/signin' component={SignIn} />
// <Route  path='/signup' component={SignUp} />