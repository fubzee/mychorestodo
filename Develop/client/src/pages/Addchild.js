import React from "react";
import Baseline from "../components/baseline";
import AddChild from "../components/addchild";

const AddchildPage = () => {
  return (
    <div>
      <AddChild />
      <Baseline {...Baseline} />
    </div>
  );
};

export default AddchildPage;
