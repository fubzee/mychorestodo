import React from 'react';
import Baseline from '../components/baseline';
import Parentchores from '../components/parentchores';




const ParentPage = () => {

    return(
            <div>
                <Parentchores
                {...Parentchores}
                />
                 <Baseline
                {...Baseline}
                />
            </div>
    );
}

export default ParentPage;