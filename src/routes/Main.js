import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Dashboard from 'components/Dashboard';
import SourceSystems from 'components/SourceSystems';
import CreateSourceSystem from 'components/SourceSystems/CreateSourceSystem';
import DataAssets from 'components/DataAssets';
import CreateDataAsset from 'components/DataAssets/CreateDataAsset';
import CreateLakeDestination from 'components/LakeDestination/CreateLakeDestination';
import LakeDestination from 'components/LakeDestination';
import DataAssetDetails from 'components/DataAssets/DataAssetDetails'
import DataCatalogDetails from 'components/DataAssets/DataCatalogDetails';

const Page = props =>(
    <Routes>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route path="/source-systems" element={<SourceSystems/>}/>
        <Route path="/source-systems/create" element={<CreateSourceSystem/>}/>
        <Route path="/source-systems/edit" element={<CreateSourceSystem/>}/>
        <Route path="/data-assets" element={<DataAssets/>}/>
        <Route path="/data-assets/create" element={<CreateDataAsset/>}/>
        <Route path="/data-assets/edit" element={<CreateDataAsset/>}/>
        <Route path="/data-assets/details" element={<DataAssetDetails/>}/>
        <Route path="/data-assets/delete" element={<DataAssetDetails/>}/>
        <Route path="/data-assets/catalog-details" element={<DataCatalogDetails/>}/>
        <Route path="/lake-destinations" element={<LakeDestination/>}/>
        <Route path="/lake-destinations/create" element={<CreateLakeDestination/>}/>
        <Route path="/lake-destinations/edit" element={<CreateLakeDestination/>}/>
        <Route path="*" element={<Navigate to="/" />}/>
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