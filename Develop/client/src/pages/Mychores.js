import React from 'react';
import Baseline from '../components/baseline';
import Childchorelists  from '../components/childchores';
import Headline from '../components/headline';



const Chores = () => {

    return(

    <div>
        <Headline
        {...Headline}
        />
        <Childchorelists
        {...Childchorelists}
        />
         <Baseline
        {...Baseline}
        />
    </div>
 
    );
}

export default Chores;