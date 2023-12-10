import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMyEnrolledOrders } from "../../../services/operations/profileApi";

const MyOrders = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [myOrders, setMyOrders] = useState(null);

  const getMyOrders = async () => {
    try {
      const response = await getMyEnrolledOrders(token);
      setMyOrders(response);
    } catch (error) {
      console.log("Unable to fetch enrollled Orders", error);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className="text-white">
      <h2>My Orders</h2>
      {!myOrders ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : !myOrders.length ? (
        <p>You Don't Have Any Orders</p>
      ) : (
        <div>
          {myOrders.map((product, index) => (
            <>
              <div key={index}>
                <div>
                  <div>
                    <p>ORDER PLACED</p>
                    <p>2023</p>
                  </div>
                  <div>
                    <p>Price</p>
                    <p>{product?.price}</p>
                  </div>
                  <div>
                    <p>SHIP TO</p>
                    <p>{user?.name}</p>
                  </div>
                </div>
                <div>
                  <img src={product?.thumbnail} alt={product?.productName} />
                  <div>
                    <p>{product?.productName}</p>
                    <p>
                      {product?.description.length > 50
                        ? product?.description.slice(0, 50)
                        : product?.description}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
