import React, {useContext} from 'react'
import Navbar from './Navbar'
import TokenContextProvider from "../contexts/TokenContext";
import Main from "./Main";
console.warn = console.error = () => {};

function Check(){

    return  <div>
            <TokenContextProvider>


                    <Navbar />
                    <Main />


            </TokenContextProvider>
    </div>;
}


const Devcon = () => (
    Check()
);

export default Devcon