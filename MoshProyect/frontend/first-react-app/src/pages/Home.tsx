import Alert from "../components/Alert";
import ListGroup from "../components/ListGroup";
import Button from "../components/Button";
import { useState } from "react";

function Home() {
  let items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <div>
      <ListGroup
        items={items}
        heading="Lista de items"
        onSelectItem={handleSelectItem}
      />
      {alertVisible && (
        <Alert onClose={() => setAlertVisible(false)}>Alerta</Alert>
      )}
      <Button
        color="primary"
        onClick={() => setAlertVisible(true)}
        children="Click me"
      />
    </div>
  );
}

export default Home;
