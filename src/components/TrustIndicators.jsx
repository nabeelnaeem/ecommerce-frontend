const ROUNDED_CLASS = "rounded-2xl";
const SHADOW_CLASS = "shadow-lg";
const CONTAINER_CLASS = "bg-white p-6";
const INNER_CONTAINER_CLASS = "space-y-4";
const INDICATOR_CLASS = "flex items-center space-x-3";
const DOT_CLASS = "w-2 h-2 bg-green-500 rounded-full";
const TEXT_CLASS = "text-sm text-gray-600";

const TrustIndicators = () => (
    <div className={`${CONTAINER_CLASS} ${ROUNDED_CLASS} ${SHADOW_CLASS}`}>
        <div className={INNER_CONTAINER_CLASS}>
            <div className={INDICATOR_CLASS}>
                <div className={DOT_CLASS}></div>
                <span className={TEXT_CLASS}>SSL Secured Payment</span>
            </div>
            <div className={INDICATOR_CLASS}>
                <div className={DOT_CLASS}></div>
                <span className={TEXT_CLASS}>30-Day Money Back Guarantee</span>
            </div>
            <div className={INDICATOR_CLASS}>
                <div className={DOT_CLASS}></div>
                <span className={TEXT_CLASS}>Free Returns & Exchanges</span>
            </div>
        </div>
    </div>
);

export default TrustIndicators;