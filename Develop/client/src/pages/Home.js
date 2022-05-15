import React from 'react';
import Headline from '../components/headline';
import LoginForm from '../components/login';
import Registerbtn from '../components/registerbutton'
import styled from 'styled-components';


const ImgCard = styled.div`
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
max-width: auto;
background-color: #FFF8DC;
`;
const Home = () => {

    return(

    <div>
        <div>
            <Headline
            {...Headline}
            />  
        </div>
        
        <LoginForm />
        <ImgCard>
            <picture>
            <source srcSet="/main_page_bg01.png" type="image/svg+xml"></source>
                <img src="/public/main_page_bg01.png" 
                    className=" img-homepage" 
                    alt="cleaning_chores"
                    height = "388" width = "388">
                    </img>
            </picture>
        </ImgCard>
        <ImgCard>
            <picture>
                <source srcSet="/main_page_bg02.png" type="image/svg+xml"></source>
                <img src="/public/main_page_bg02.png" 
                   className=" img-homepage" 
                    alt="bin_chores"></img>
            </picture>
        </ImgCard>
        <ImgCard>
            <picture>
                <source srcSet="/main_page_bg03.png" type="image/svg+xml"></source>
                <img src="/public/main_page_bg03.png" 
                    className=" img-homepage" 
                    alt="bin_chores"></img>
            </picture>
        </ImgCard>
        <ImgCard>
            <picture>
                <source srcSet="/main_page_bg04.png" type="image/svg+xml"></source>
                <img src="/public/main_page_bg04.png" 
                     className=" img-homepage" 
                    alt="bin_chores"></img>
            </picture>
        </ImgCard>      
        <div>
            <Registerbtn />
        </div>
    </div>
    );
}

export default Home;