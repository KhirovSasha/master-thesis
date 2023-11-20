import { useParams } from "react-router-dom";
export function LandParameters({parametersAt}) {
    const { id } = useParams();
    return (<h1>Hi {id}</h1>)
}

export default LandParameters;