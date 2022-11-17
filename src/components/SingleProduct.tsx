import { title } from "process";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import {
  deleteProducts,

} from "../redux/reducers/productReducer";
import { addCartItem } from "../redux/reducers/cartReducer";
import { editProduct } from "../redux/reducers/productReducer";

const SingleProduct = () => {
  const singleProductValue = useAppSelector(
    (state) => state.singleProductReducer
  );
  console.log(singleProductValue);
  
  const dispatch = useAppDispatch();
  const [titleValue, setTitle] = useState("");
  const [priceValue, setPrice] = useState(0);
  const navigate = useNavigate();
  const addToCart = (
    id: number,
    title: string,
    price: number,
    image: string
  ) => {
    dispatch(addCartItem({ id: id, title: title, price: Number(price), image: image, quantity: 1 }));
  };
  const onEdit = (id: number, title: string, price: number, images:string) => {

    dispatch(
      editProduct({
        id: id,
        data: {
          id: id,
          title: titleValue,
          price: Number(priceValue),
          description:
            "The Football Is Good For Training And Recreational Purposes",
          category: {
            id: 4,
            name: "Shoes",
            image: "https://api.lorem.space/image/shoes?w=640&h=480&r=4133"
          },
          images: [
            images,
            "https://api.lorem.space/image/shoes?w=640&h=480&r=401",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=8527"
            ]
        },
      })
    );
    navigate('/product')
  };
  const user = useAppSelector((state) => state.userReducer.currentUser);

  return (
    <div className="container">
      <div className="single">
        {singleProductValue.map((item) => (
          <div key={item.id} className="single-block">
            {" "}
            <div className="single-item">
            <div className="product__image single__image">
              {<img src={item.category.image} alt="shoes" />}
            </div>
            </div>
            <div className="single-item">
            <div className="product__title single__title">{item.title}</div>{" "}
            <div style={{ display: user?.role ==="admin" ? 'block' : 'none'}} className="product__admin">
            <label style={{display: 'block'}} htmlFor="text">Change title: </label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
            <label style={{display: 'block'}} htmlFor="text">Change price: </label>
            <input
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            </div>
      
            <div className="product__price single__price">{`${item.price}$`} </div>{" "}
            <div className="product__price single__descr">{item.description} </div>{" "}
            <div className="single__buttons">
            <button
              style={{ display: "block" }}
              onClick={() => {
                if (user?.role === "admin") {
                  onEdit(item.id, item.title, item.price,item.images[0]);
                } else {
                  addToCart(item.id, item.title, Number(item.price) , item.images[0]);
                }
              }}
              className="button product__button"
            >
              {user?.role === "admin" ? "Edit" : "Add to cart"}{" "}
            </button>
            <button className="button product__button" onClick={() => navigate('/product')}> Back to shopping</button>
              </div>
   
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
export default SingleProduct;
