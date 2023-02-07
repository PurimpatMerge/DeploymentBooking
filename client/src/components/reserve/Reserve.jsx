import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Firststep from "./steps/Firststep";
import Secondstep from "./steps/Secondstep";

import { Button, message, Steps, theme } from 'antd';


const steps = [
  {
    title: 'First',
    content: <Firststep/>,
  },
  {
    title: 'Second',
    content: <Secondstep/>,
  },
];


const Reserve = ({ setOpen, hotelId }) => {

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));


 
  return (
    <div className="reserve ">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <div>


{/* Step */}
<>
      <Steps current={current} items={items} />
      <div className="text-center " >{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button  onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button  onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
{/* Step */}



        </div>
      </div>
    </div>
  );
};

export default Reserve;
