import React from 'react';
import Headline from '../components/headline';
import LoginForm from '../components/login';
import Registerbtn from '../components/registerbutton'

const Home = () => {

    return(

    <div>
        <Headline
        {...Headline}
        />
        <LoginForm
        {...LoginForm}
        />
        <Registerbtn
        {...Registerbtn} 
        />   
    </div>
 
    );
}

export default Home;