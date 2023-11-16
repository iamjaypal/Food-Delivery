import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
function Card(props) {

    const priceRef = useRef();
    const Cartdata = useCart();
    const dispatch = useDispatchCart();
    const options = props.options;
    const priceOptions = Object.keys(options);
    const [qty, setqty] = useState(1);
    const [size, setsize] = useState('');
    useEffect(() => {
        setsize(priceRef.current.value)
    }, [])
    const finalPrice = qty * parseInt(options[size]);
    const handeltocart = async () => {

        let food = [];
        for (const item of Cartdata) {
            console.log("items " ,item);
            console.log("foodyitem " ,props.foodyitem._id);
           
            if (item.id === props.foodyitem._id) {
                food.push(item);
                break;
            }
        }
        // console.log(food)
        // console.log(new Date())
        // console.log("this is my ",food.length);
        if (food.length>0) {
            console.log("food size = ",food[0].size);
            console.log("backend size = ",size);
            if (food[0].size === size) {
                console.log("chal ra h ");
                await dispatch({ type: "UPDATE", id: props.foodyitem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food[0].size !== size) {
                await dispatch({ type: "ADD", id: props.foodyitem._id, name: props.foodyitem._id, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }


        await dispatch({
            type: "ADD", id: props.foodyitem._id, name: props.foodyitem.name,
            price: finalPrice, qty: qty, size: size
        });



    }

    return (
        <>

            <div className="card" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.foodyitem.img} style={{ height: "150px", objectFit: "fill" }} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.foodyitem.name}</h5>

                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-light' onChange={(e) => setqty(e.target.value)}>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='m-2 h-100 bg-light rounded' ref={priceRef} onChange={(e) => setsize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return (<option key={data} value={data}>{data}</option>)

                            })}
                        </select>

                        <div className='d-lnline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                        <hr />
                        <button className='btn btn-primary justify-content-center mx-4' onClick={handeltocart}>ADD To CART</button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Card
