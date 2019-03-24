import fs from 'fs';
import path from 'path';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.combineReducers = () => {
    return {
        auth: null,
        environment: null,
        invoice: null,
        reservations: null
    }
}