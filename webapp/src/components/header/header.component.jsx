import React, { useState } from 'react';




// Material UI Icons


// Other Components
import Sidebar from '../sidebar/sidebar.component';


const Header = ({ logout, user }) => {
    const [open, setOpen] = useState(true);

    return (
        <>
            <Sidebar 
                user={user}
                open={open}
                logout={logout}
            />
        </>
    );
}
export default Header;