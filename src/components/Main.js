import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';

const Main = props => {

    const {googleSignIn, user, fbSignIn} = UserAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if(user !== null){
            navigate("/account")
        }
    },[user])

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error);
        }
    }

    const handleFbSignIn = async () => {
        try {
            await fbSignIn()
        } catch (error) {
            console.log(error);
        }
    }

    // const handleLogout = async () => {
    //     try {
    //         await logOut();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    

    return(
        <div className='main_login' >
            <div className='title'>Please Login</div>
            <div className='google_login' onClick={handleGoogleSignIn} > Sign In with Google</div>
            {/* <div className='facebook_login' onClick={handleFbSignIn} > Sign In with Facebook</div>    */}
        </div>
    )
}

export default Main;