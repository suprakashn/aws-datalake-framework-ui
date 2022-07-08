import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from 'components/Dashboard';
import SourceSystems from 'components/SourceSystems';
import CreateSourceSystem from 'components/SourceSystems/CreateSourceSystem';
import DataAssets from 'components/DataAssets';
import CreateDataAsset from 'components/DataAssets/CreateDataAsset';
import CreateLakeDestination from 'components/LakeDestination/CreateLakeDestination';
import LakeDestination from 'components/LakeDestination';

const Page = props =>(
    <Routes>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route path="/source-systems" element={<SourceSystems/>}/>
        <Route path="/create-source-system" element={<CreateSourceSystem/>}/>
        <Route path="/data-assets" element={<DataAssets/>}/>
        <Route path="/create-data-asset" element={<CreateDataAsset/>}/>
        <Route path="/create-lake-destination" element={<CreateLakeDestination/>}/>
        <Route path="/lake-destinations" element={<LakeDestination/>}/>

    </Routes>
)

const Main = (props) => {
    return (
        <div>
            <Page />
        </div>
    )
}

export default Main;