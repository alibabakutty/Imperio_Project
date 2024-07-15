import { useParams } from "react-router-dom";
import DisplayofMasters from "./display/DisplayofMasters";
import AlterofMasters from "./alter/AlterofMasters";
import ListofMasters from "./create/ListofMasters";

const Master = () => {
  const { type } = useParams();

  const renderComp = () => {
    switch (type) {
      case "create":
        return <ListofMasters />;
      case "display":
        return <DisplayofMasters />;
      case "alter":
        return <AlterofMasters />;

      default:
        return null;
    }
  };
  return (
    <>
      <div>{renderComp()}</div>
    </>
  );
};

export default Master;


