// Constants for classnames
const CONTAINER_CLASSES = "bg-white p-6 rounded-2xl shadow-lg space-y-4";
const TITLE_CLASSES = "text-xl font-semibold text-gray-900";
const ROW_CLASSES = "flex justify-between";
const LABEL_CLASSES = "text-gray-600";
const VALUE_CLASSES = "font-medium";
const TOTAL_ROW_CLASSES = "border-t pt-4 flex justify-between text-lg font-bold";
const TOTAL_AMOUNT_CLASSES = "text-indigo-600";

const CheckoutOrderSummary = ({ subtotal, shipping, tax, total }) => {
    return (
        <div className={CONTAINER_CLASSES}>
            <h2 className={TITLE_CLASSES}>Order Summary</h2>

            <div className={ROW_CLASSES}>
                <span className={LABEL_CLASSES}>Subtotal</span>
                <span className={VALUE_CLASSES}>Rs {subtotal.toFixed(2)}</span>
            </div>

            <div className={ROW_CLASSES}>
                <span className={LABEL_CLASSES}>Shipping</span>
                <span className={VALUE_CLASSES}>Rs {shipping.toFixed(2)}</span>
            </div>

            <div className={TOTAL_ROW_CLASSES}>
                <span>Total</span>
                <span className={TOTAL_AMOUNT_CLASSES}>Rs {total.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default CheckoutOrderSummary;