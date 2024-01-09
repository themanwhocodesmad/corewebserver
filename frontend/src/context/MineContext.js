import { createContext, useReducer } from 'react';

// Creating a context for mines. This will be used to share mines data across components.
export const MinesContext = createContext();

export const minesReducer = (state, action)=>{
    switch (action.type) {
        case 'SET_MINES':
            return {
                mines:action.payload
            }
        case 'CREATE_MINE':
            return {
                mines: [action.payload, ...state.mines]
            }

            case 'DELETE_MINE':
                return {
                    ...state,
                    mines: state.mines.filter(w => w._id !== action.payload)
                };

            case 'UPGRADE_MINE':
                return {
                    ...state,
                    mines: state.mines.map(mine => {
                        if (mine._id === action.payload) {
                            return {
                                ...mine,
                                productionRate: mine.productionRate + 1,
                                population: mine.population + 1,
                                level: mine.level + 1
                            };
                        }
                        return mine;
                    })
                };
        default:
            return state
    }
}

// minesContextProvider is a component that wraps its children in a minesContext.Provider. 
// This allows any child components to access the mines context.
export const MinesContextProvider = ({ children }) => {
    // Here, you would typically include state and functions related to mines
    // that you want to provide to all components within this context. For example:
    // const [mines, setmines] = useState([]);
    // const addmine = (mine) => { ... };
    const [state, dispatch] = useReducer(minesReducer, {mines:null
    })

    //dispatch({type:'SET_mineS', payload: [{},{}]})

    return (
        // The value prop of the Provider component is where you pass in the data or functions 
        // that you want to be accessible to all child components.
        // For instance: <minesContext.Provider value={{ mines, addmine }}>
        <MinesContext.Provider value={{...state, dispatch}}>
            {children} {/* Render children components passed into this provider */}
        </MinesContext.Provider>
    );
};
