import AppNavbar from '../../components/AppNavbar/AppNavbar';
import LawText from "./LawText";

/**
 * Define the Laws component
 * @returns {JSX.Element}
 */
const Laws = () => {

    // Return JSX that renders the AppNavbar followed by LawText component
    return (
        <div>
            <AppNavbar/>
            <div style={{ display: 'flex', justifyContent: 'center' , padding: '100px'}}>
                <div style={{ width: '75%' }}>
                    <LawText/>
                </div>
            </div>
        </div>
    );
};

export default Laws;