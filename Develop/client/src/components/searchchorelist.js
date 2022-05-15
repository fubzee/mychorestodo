import React, { useState, useEffect, useContext} from 'react';
import ResultList  from './resultlist';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PARENT_CHORES } from '../utils/queries';
import { QUERY_ALL_CHILDREN_CHORES } from '../utils/queries';
// import { UPDATE_ACCOUNT_STATUS } from '../utils/actions';
import { useAccountContext } from '../utils/GlobalState';


const Choreslist = () => {

  const [results, setResults] = useState('');
  const getParentChores = useQuery(QUERY_ALL_PARENT_CHORES);
  const getChildChores  = useQuery(QUERY_ALL_CHILDREN_CHORES);
  const [state, dispatch] = useAccountContext();
  console.log(state.user_Id, state.usertype)
  const ChoreList = () => {

    switch (state.usertype) {
      case "Parent": 
          const [Parentchores] = getParentChores(useContext.ParentContext.user_Id)
          setResults(Parentchores.data.data)
          break;
      case "Child": 
          const [Childchores] = getChildChores(useContext.ChildContext.user_Id)
          setResults(Childchores.data.data)
          break;
      default:
        console.error();
      }
  }

  useEffect(() => {
    setResults();
  }, []);

  return (
    <div>
      {/* Pass our results to the ResultsList component to map over */}
      <ResultList results={ChoreList} />
    </div>
    );
  };

  export default Choreslist;
  
