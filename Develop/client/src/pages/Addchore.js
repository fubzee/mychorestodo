import React from "react";
import Baseline from "../components/baseline";
import AddChore from "../components/addchores";

const AddchorePage = () => {
  return (
    <div>
      <AddChore />
      <Baseline {...Baseline} />
    </div>
  );
};

export default AddchorePage;
