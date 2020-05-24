import React from 'react';
import './signin.style.css';
import CustomButton from '../../components/custom-button/custom.button';
import { auth, signInwithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (error) {
            console.log(error);
        }  
    };

    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    render(){
        return(
           
           <form onSubmit={this.handleSubmit}>
           <div>
            <h1>SignIn page</h1>
            <span>sign in withn your email and password</span>
           
            <div id="login-box">
            <div className="left">
              
              <input type="email" name="email" value={this.state.email} placeholder="E-mail" 
              onChange={this.handleChange} />
              <input type="password" name="password" value={this.state.password} placeholder="Password" 
              onChange={this.handleChange} />

              <CustomButton type="submit" name="signup_submit" 
              className='submit' > SIGN IN </CustomButton>
              <CustomButton onClick={signInwithGoogle} name="signup_submit" 
              className='submit'> SIGN IN WiTH GOOGLE</CustomButton>
            </div>
            </div>
            </div>
            </form>
        );
    }
}

export default SignIn;