import { MinesContext } from "../context/MineContext";
import { useContext } from "react";

export const useMinesContext = ()=>{
    const context = useContext(MinesContext)

    if (!context){
        throw Error('useMinesContext must be used inside an MinesContextProvider!')
    }
    return context
}