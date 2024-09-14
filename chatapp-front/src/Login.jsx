import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

function Login ({setUser}){
return(
    <><LeftPanel setUser={setUser}/><RightPanel /></>
);
}

export default Login;