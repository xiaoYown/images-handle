import * as types from './types';

const ACTIONS = {
    // 增加 action
    increament(){
        return{
            type: types.INCREMENT
        }
    },
    // 减少 action
    decreament(){
        return{
            type: types.DECREAMENT
        }
    }
};

export default ACTIONS;
