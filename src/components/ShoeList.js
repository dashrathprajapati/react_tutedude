import React from 'react'

const ShoeList = ({shoes, addToCart}) => {

    return (
        <div>
            <h4>Available Shoes</h4>
            {shoes.map( (shoe) => (
                <div className='card mb-3' key = {shoe.id}>
                    <div className='row g-0'>
                        <div className='col-md-4 pe-3'>
                            <img src = {shoe.image} className="img-fluid rounded-start m-1" alt={shoe.name} />
                        </div>

                        <div className='col-md-8'>
                            <div className='cad-body'>
                                <h5>{shoe.name}</h5>
                                <h5>Rs. {shoe.price}</h5>
                                <button className='btn btn-primary' onClick={() => addToCart(shoe)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ShoeList
