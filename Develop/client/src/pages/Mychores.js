import React from 'react';
import Baseline from '../components/baseline';
// import ResultList  from '../components/resultlist';
import Headline from '../components/headline';
import Chorelist from'../components/searchchorelist';



const MyChores = () => {

    return(

    <div>
        <Headline
        {...Headline}
        />
        <Chorelist
        {...Chorelist}
        />
         <Baseline
        {...Baseline}
        />
    </div>
 
    );
}

export default MyChores;