import {combineReducers} from 'redux'

import index from './indexreducer'
import origin from "./originreducer";
import version from "./versionreducer";
import business from './business';
import awardIndex from './awardIndexReducer';
import awardOrigin from './awardOriginReducer'
import geo from './geoReducer'
export default combineReducers({
    index,
    origin,
    version,
    business,
    awardIndex,
    awardOrigin,
    geo
})