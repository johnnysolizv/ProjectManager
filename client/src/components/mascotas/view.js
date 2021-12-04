//import { Link } from "@reach/router";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProjectView = ({mascotas, id}) => {

    //const [data, setData] = useState({});
    const [data] = useState({});

    // useEffect(() => {
    //     setData(mascotas[id])
    // }, [])

    return <>
        <h1>Project: {data.project}</h1>
        <h1>due date: {data.duedate}</h1>
        <h1>Status: {data.status}</h1>

        <Link to="/project/">Volver</Link>
    </>
}

export default ProjectView;