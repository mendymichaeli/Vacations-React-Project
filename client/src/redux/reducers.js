
const initialState = {
    vacations:[],
    followedVacation:[],
    firstName:'',
    email:'',
    isLogged:false,
    role:'',
    msg:'',
    userId:'',
};

function rootReducer(state = initialState, action) {
    console.log("Root : ", action)
    switch (action.type) {
        case 'getAllVacations':
            state = { ...state, vacations: action.payload }
            break;
        case 'logOut':
            state = { ...state, isLogged: action.payload }
            break;
        case 'vacationsChanged':
            state = { ...state, msg: action.payload }
            break;
        case 'saveCurrentUser':
            state = { ...state, 
                role: action.payload.role, 
                firstName: action.payload.firstName,  
                userId: action.payload.id,  
                isLogged: action.payload.isLogged,  
                email: action.payload.email }
            break;
        case 'errorCurrentUser':
            state = { ...state, msg: action.payload }
            break;    
    }
    return state;
    
}
export default rootReducer;