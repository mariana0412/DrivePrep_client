import AppNavbar from '../AppNavbar/AppNavbar';
import LawText from "./LawText";

const Laws = () => {

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