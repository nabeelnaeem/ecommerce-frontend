const CheckoutOrderSummary = ({ subtotal, shipping, tax, total }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>

            <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">Rs {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Rs {shipping.toFixed(2)}</span>
            </div>


            <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-indigo-600">Rs {total.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default CheckoutOrderSummary;
