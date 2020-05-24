import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import './header.style.css'
//import Header1 from './header1';

const Header = ({ currentUser }) => {
    return(
        <div className='header'>
        <Link to='/'>
        HOME
        </Link>

        

        <div className='options'>
        
            {
                currentUser ? 
                (<div className='option1' onClick={() => auth.signOut()} > 
                SIGN OUT </div>) : 
                (<div><Link to='/signin' className='option'> SIGN IN</Link>
                <Link to='/signup' className='option'> SIGN UP</Link> </div>) 
            }
        </div>
        </div>
    );
}

export default Header;

// <div> {
//     currentUser.map(current => (
//         <span>{current[0].email}</span>
//     ))
// } </div>

// <div> {
//     user.map(({ id, ...otherLists }) => (
//         <Header1 key={id} {...otherLists} />
//     ))
// } </div>