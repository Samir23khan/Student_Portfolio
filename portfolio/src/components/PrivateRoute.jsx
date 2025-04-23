import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user"); 

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [navigate, user]);

  return user ? <Element {...rest} /> : null; 
};

export default PrivateRoute;
