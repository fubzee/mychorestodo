import React, { useState, useEffect, useContext} from 'react';
import ResultList  from './resultlist';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PARENT_CHORES } from '../utils/queries';
import { QUERY_ALL_CHILDREN_CHORES } from '../utils/queries';
import { useParentContext, useChildContext, useAccountContext, ChildProvider, ParentProvider, AccountProvider } from '../utils/GlobalState'



const Choreslist = () => {

  const [results, setResults] = useState('');
  const getParentChores = useQuery(QUERY_ALL_PARENT_CHORES);
  const getChildChores  = useQuery(QUERY_ALL_CHILDREN_CHORES);

  const [ Parent ]  = useParentContext(ParentProvider);
  const [ Child ] = useChildContext(ChildProvider);
  const [ state ] = useAccountContext(AccountProvider);
  console.log(state);
  const ChoreList = () => {

    switch (state.login.user.usertype) {
      case "Parent": 
          console.log(state.login.user._Id)
          const [Parentchores] = getParentChores(Parent.data.getParent._Id)
          setResults(results, Parentchores)
          break;
      case "Child": 
        console.log(state.login.user._Id)
          const [Childchores] = getChildChores(Child.data.getChild._Id)
          setResults(results, Childchores)
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
          {results ? (

              <ResultList results={ChoreList} />    
          
          ) : null}
    </div>
    );
  };

  export default Choreslist;
  
