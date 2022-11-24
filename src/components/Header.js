import React from 'react'
import { UserAuth } from './AuthContext'

const Header = props => {

    const { user, logOut } = UserAuth()

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='header'>
            <div className='title'>Get Mega</div>
            {user?.accessToken && 
                <div className='logout_btn' onClick={handleLogout} >Logout</div>
            }
        </div>
    )
}

export default Header;