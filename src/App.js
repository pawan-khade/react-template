import React, { useState } from 'react';
import Header from './Layout/Header';
import Content from './Layout/Content';
import AlertDismissible from './AlertDismissible';

export const ShowContext = React.createContext();

function App() {
    const [show, setShow] = useState(false);
    const [msg, setMsg]   = useState();


    return (
      <div>
        <ShowContext.Provider value={{setShow:setShow,setMsg:setMsg}}>
          <Header/>
          <Content/>
        </ShowContext.Provider>
        <AlertDismissible myShow={show} mySetShow={setShow} myMsg={msg}/>
      </div>
    );
}

export default App;
