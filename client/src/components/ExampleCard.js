import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img from "../assets/testimage.jpeg"

function BasicExample() {
  return (
    <Card className="m-auto mt-3" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>Christoph KP</Card.Title>
        <Card.Subtitle>Information:</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Subtitle>Research:</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Schedule Meeting</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;
