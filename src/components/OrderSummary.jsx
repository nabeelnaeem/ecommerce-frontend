const ROUNDED_CLASS = "rounded-2xl";
const SHADOW_CLASS = "shadow-lg";
const TRANSITION_CLASS = "transition-colors";
const CONTAINER_CLASS = "space-y-6";
const CARD_CLASS = "bg-white p-6";
const SPACING_CLASS = "space-y-4";
const BORDER_CLASS = "border-t pt-4";
const TITLE_CLASS = "text-xl font-semibold text-gray-900 mb-6";
const LABEL_CLASS = "text-gray-600";
const VALUE_CLASS = "font-medium";
const SHIPPING_NOTE_CLASS = "text-sm text-gray-500 font-medium";
const TOTAL_CLASS = "flex justify-between text-lg font-bold";
const TOTAL_VALUE_CLASS = "text-indigo-600";
const SUMMARY_ITEM_CLASS = "flex justify-between";

const OrderSummary = ({ subtotal }) => (
    <div className={CONTAINER_CLASS}>
        <div className={`${CARD_CLASS} ${ROUNDED_CLASS} ${SHADOW_CLASS}`}>
            <h2 className={TITLE_CLASS}>Order Summary</h2>

            <div className={SPACING_CLASS}>
                <div className={SUMMARY_ITEM_CLASS}>
                    <span className={LABEL_CLASS}>Subtotal</span>
                    <span className={VALUE_CLASS}>Rs {subtotal.toFixed(2)}</span>
                </div>

                <div className={SHIPPING_NOTE_CLASS}>
                    🚚 Shipping will be calculated at checkout.
                </div>

                <div className={BORDER_CLASS}>
                    <div className={TOTAL_CLASS}>
                        <span>Total</span>
                        <span className={TOTAL_VALUE_CLASS}>Rs {subtotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default OrderSummary;