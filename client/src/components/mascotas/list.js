import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button, CardGroup } from "reactstrap";
import { useContext } from "react";


const ProjectList = (props) => {

  const eliminar = (e, id) => {
    e.stopPropagation();
    if (id) {
      props.eliminar(id);
    }
  };

  const InProgress = (e, data) => {
    e.stopPropagation();
    data.status = 'InProgress';
    props.update(data);
}

const Completed = (e, data) => {
    e.stopPropagation();
    data.status = 'Completed';
    props.update(data);
}



  console.log("PROPS", props);

  return (
    <CardGroup>
      <Card>
        {props.list.filter(proyecto => proyecto.status == "Backlog").map((elem, i) => (
          <>
            <Card key={i}>
              <CardBody>
                <CardTitle tag="h5">{elem.project}</CardTitle>
                <CardText>{elem.duedate}</CardText>
                <Button onClick={e => InProgress(e, elem)}> Start Project
                 
                 </Button>
              </CardBody>
            </Card>
          </>
        ))}
      </Card>
      <Card>
        {props.list.filter(proyecto => proyecto.status == "InProgress").map((elem, i) => (
          <>
            <Card key={i}>
              <CardBody>
                <CardTitle tag="h5">{elem.project}</CardTitle>
                <CardText>{elem.duedate}</CardText>
                <Button onClick={e => Completed(e, elem)} > Move To Completted
                 
                </Button>
              </CardBody>
            </Card>
          </>
        ))}
      </Card>
      <Card>
        {props.list.filter(proyecto => proyecto.status == "Completed").map((elem, i) => (
          <>
            <Card key={i}>
              <CardBody>
                <CardTitle tag="h5">{elem.project}</CardTitle>
                <CardText>{elem.duedate}</CardText>
                <Button onClick={e => eliminar(e, elem._id)}>
                  Remove Project                  
                </Button>
              </CardBody>
            </Card>
          </>
        ))}
      </Card>
    </CardGroup>
  );
};

export default ProjectList;
