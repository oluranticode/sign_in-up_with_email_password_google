import React from 'react';
import './signup.style.css';
import CustomButton from '../../components/custom-button/custom.button';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword){
            alert("password don't match");
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });

            this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
            });
        } catch (error){
            console.error(error);
        }
    };

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({[name] : value});
    }

    render(){
        const { displayName, email, password, confirmPassword } = this.state;
        return(
            <form onSubmit={this.handleSubmit}>
           <div>
            <h1>Sign UP page</h1>
            <span>sign Up with your email and password!</span>
           
            <div id="login-box">
            <div className="left">
              
            <input type="text" name="displayName" value={displayName} placeholder="Your displayName" 
            onChange={this.handleChange} />
            <input type="email" name="email" value={email} placeholder="E-mail" 
            onChange={this.handleChange} />
            <input type="password" name="password" value={password} placeholder="Password" 
            onChange={this.handleChange} />
            <input type="password" name="confirmPassword" value={confirmPassword} placeholder="confirm Password" 
            onChange={this.handleChange} />
            
              <CustomButton type="submit" className='submit' name="signup_submit"> SIGN UP</CustomButton>
            </div>
            </div>
            </div>
            </form>
        );
    }
}

export default SignUp;