import { useMinesContext } from '../hooks/useMineContext';
import '../static/css/mine-details.css';

const MineDetails = ({ mine }) => {
    const { dispatch } = useMinesContext();

    // Function to upgrade a mine
    const handleClick = async () => {
        const response = await fetch('/api/mines/upgrade/' + mine._id, {
            method: 'PUT'
        });

        if (response.ok) {
            // Dispatch the upgrade action with the mine's ID
            dispatch({ type: 'UPGRADE_MINE', payload: mine._id });
        }
    };

    if (!mine) {
        return <p>No mine details available.</p>;
    }

    return (
        <div className="mine-details">
            <h4>{mine.name} ({mine.health}) | level: {mine.level}</h4>
            <p>Production rate: {mine.productionRate}</p>
            <>00:10:00 seconds remaining</>
            <p>Next upgrade</p>
            <ul className='upgrade-costs'>
                <li className="cost-metal">M: {mine.upgradeCosts.metal}</li>
            
                <li className="cost-crystal">C: {mine.upgradeCosts.crystal}</li>
                <li className="cost-gas">G: {mine.upgradeCosts.gas}</li>
                <li className="cost-energy">E: {mine.upgradeCosts.energy}</li>
            </ul>

            <button onClick={handleClick}>Upgrade</button>
        </div>
    );
}

export default MineDetails;
