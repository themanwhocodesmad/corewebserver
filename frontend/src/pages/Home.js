import { useEffect } from "react";

// components
import MineDetails from "../components/MinesDetails";

// context
import { useMinesContext } from "../hooks/useMineContext";

const Home = () => {
    const {mines, dispatch} = useMinesContext()

    useEffect(() => {
        const fetchMines = async () => {
            try {
                const response = await fetch('/api/mines/all');
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const json = await response.json();

                // Update State with mines
                dispatch({type:'SET_MINES', payload: json})

            } catch (error) {

                // Handle Error in the UI
                console.error('Failed to fetch mines:', error);
            }
        };

        fetchMines();
    }, [dispatch]);

    return (
        <div className="Home">
            <div className="mines">
                {mines && mines.map((mine) => (
                    <MineDetails key={mine._id} mine={mine}/>
                ))}
            </div>
        </div>
    );
};

export default Home;
