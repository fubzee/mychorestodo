import React from 'react';
import Headline from '../components/headline';
import LoginForm from '../components/login';
import Registerbtn from '../components/registerbutton'

const Home = () => {

    return(

    <div>
        <div className='jumbotron'>
            <Headline
            {...Headline}
            />
        </div>
        <div className='container'>
            <div className = 'row'>
                <div className = 'col-md-6'>
                    <LoginForm />
                </div>
                <div className = 'col-md-6'>
                    <Registerbtn />
                </div>
            </div>
        </div>
    </div>
    );
}

export default Home;