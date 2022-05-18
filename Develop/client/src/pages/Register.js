import React from "react";
import Registration from "../components/register";
import Baseline from "../components/baseline";
import Headline from "../components/headline";

const Register = () => {
  return (
    <div>
      <Headline {...Headline} />
      <Registration {...Registration} />
      <Baseline {...Baseline} />
    </div>
  );
};

export default Register;
