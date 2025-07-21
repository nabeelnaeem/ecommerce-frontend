const CONTAINER_CLASS = "bg-white p-6 rounded-2xl shadow-lg space-y-4";
const TITLE_CLASS = "text-xl font-semibold text-gray-900 mb-2";
const ROW_CLASS = "flex justify-between";
const LABEL_CLASS = "text-gray-600";
const VALUE_CLASS = "font-medium";
const TOTAL_ROW_CLASS = "border-t pt-4 flex justify-between text-lg font-bold";
const TOTAL_VALUE_CLASS = "text-indigo-600";
const SHIPPING_NOTE_CLASS = "text-sm text-gray-500 font-medium pt-2";

const OrderSummary = ({ subtotal, shipping = null, tax = null, total = null }) => {
    const displayTotal = total !== null ? total : subtotal;
    const showShippingNote = shipping === null;

    return (
        <div className={CONTAINER_CLASS}>
            <h2 className={TITLE_CLASS}>Order Summary</h2>

            <div className={ROW_CLASS}>
                <span className={LABEL_CLASS}>Subtotal</span>
                <span className={VALUE_CLASS}>Rs {subtotal.toFixed(2)}</span>
            </div>

            {shipping !== null && (
                <div className={ROW_CLASS}>
                    <span className={LABEL_CLASS}>Shipping</span>
                    <span className={VALUE_CLASS}>Rs {shipping.toFixed(2)}</span>
                </div>
            )}

            {tax !== null && (
                <div className={ROW_CLASS}>
                    <span className={LABEL_CLASS}>Tax</span>
                    <span className={VALUE_CLASS}>Rs {tax.toFixed(2)}</span>
                </div>
            )}

            {showShippingNote && (
                <div className={SHIPPING_NOTE_CLASS}>
                    🚚 Shipping will be calculated at checkout.
                </div>
            )}

            <div className={TOTAL_ROW_CLASS}>
                <span>Total</span>
                <span className={TOTAL_VALUE_CLASS}>Rs {displayTotal.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default OrderSummary;
