import { useOutletContext, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
    const navigate = useNavigate();
    const {cart, resetCart, updateStock} = useOutletContext()

    const mappedCart = cart.map(item => (
        <div className="cart-item" key={item.id}>
            <div className="cart-image"><img src={item.image_url} alt={item.name}/></div> 
            <div className="cart-detail">
                <h2>{item.name}</h2> 
                <h3>{item.price}</h3>
                <input data-product-id={item.id} type="number" defaultValue ="1" min="1" max={item.stock} step="1"/>
            </div>
        </div>
    ))

    const handleCheckout = () => {
        const orderItems = Array.from(document.querySelectorAll(".cart-detail")).map(card => {
            const productPrice = card.querySelector("h3").textContent
            const productQuantity = card.querySelector("input").value || 1
            const productId = card.querySelector("input").dataset.productId

            const item = cart.find(item => item.id === productId)
            if (item) {
                const updatedStock = item.stock = productQuantity
                updateStock = (productId, updatedStock)
            }
            return {"quantity":productQuantity, "product_id":productId, "price_at_order":Number(productPrice)}
            })
        
        fetch("/order_items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderItems)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Failed to create order');
            }
        })
        .then(message => {
            toast.success(`Thank you for your purchase, see you soon!`)
            resetCart()
            navigate('/products');
        })
        .catch(error => toast.error('Error:', error.message));
    };
return(
    <div className="checkout">
        {mappedCart}
        <button disabled={cart.length === 0} onClick={handleCheckout}>Checkout Now</button> 
    </div>
)
}

export default Checkout;