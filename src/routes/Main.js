import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from 'components/Dashboard';
import SourceSystem from 'components/SourceSystems/SourceSystemTable';

const Page = props =>(
    <Routes>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route path="/source-systems" element={<SourceSystem/>}/>
    </Routes>
)

const Main = (props) => {
    return (
        <div>
            <Page />
        </div >
    )
}

export default Main;