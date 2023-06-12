import AppNavbar from "../../components/AppNavbar/AppNavbar";
import RulesSideBar from "./RulesSideBar";
import RulesText from "./RulesText";

/**
 * Define Rules component
 * @returns {JSX.Element}
 * @constructor
 */
const Rules = () => {
  return (
    <div>
      <AppNavbar />
      <div style={{ display: "flex", paddingTop: "70px" }}>
        <div style={{ maxWidth: "70%", padding:"2%"}}>
          <RulesText />
        </div>
        <div
          style={{
            flex: 1,
            position: "fixed",
            marginTop: "95px",
            border: "2px solid #A42E43",
            borderRadius: "10px",
            right: "0",
            top: "0",
            maxWidth: "25%", 
            height:"80%"
          }}
        >
            <div style={{overflowY: "scroll",
            height:"100%"}}>
                <RulesSideBar />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
