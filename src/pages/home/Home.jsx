import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Shield, Truck, Check, ArrowRight, Zap } from 'lucide-react';

// Layout Constants
const PAGE_CONTAINER = "min-h-screen bg-gray-50";
const SECTION_CONTAINER = "max-w-7xl mx-auto px-4";
const SECTION_PADDING = "py-16 sm:py-24";
const TEXT_CENTER = "text-center";
const GRID_COLS_1_MD_2_LG_4 = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
const GRID_COLS_2_MD_4 = "grid grid-cols-2 md:grid-cols-4";
const GAP_8 = "gap-8";
const GAP_4 = "gap-4";
const FLEX_COL = "flex flex-col";
const FLEX_ROW = "flex flex-row";
const FLEX_CENTER = "flex items-center justify-center";
const FLEX_WRAP = "flex flex-wrap justify-center items-center";

// Text Constants
const TEXT_XL = "text-xl";
const TEXT_3XL = "text-3xl";
const TEXT_4XL = "text-4xl";
const TEXT_6XL = "text-6xl";
const TEXT_SM = "text-sm";
const TEXT_LG = "text-lg";
const TEXT_BLUE_600 = "text-blue-600";
const TEXT_GRAY_600 = "text-gray-600";
const TEXT_GRAY_900 = "text-gray-900";
const TEXT_GRAY_500 = "text-gray-500";
const TEXT_GRAY_400 = "text-gray-400";
const TEXT_WHITE = "text-white";
const TEXT_GREEN_500 = "text-green-500";
const FONT_BOLD = "font-bold";
const FONT_SEMIBOLD = "font-semibold";
const FONT_MEDIUM = "font-medium";
const LEADING_TIGHT = "leading-tight";
const LEADING_RELAXED = "leading-relaxed";
const MAX_W_3XL = "max-w-3xl";
const MAX_W_2XL = "max-w-2xl";
const MAX_W_4XL = "max-w-4xl";

// Card Constants
const CARD_BASIC = "bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100 hover:border-gray-200";
const CARD_CTA = "bg-white rounded-2xl shadow-lg p-12 border border-gray-100";
const CARD_ICON = "w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-6";
const CARD_CTA_ICON = "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6";

// Button Constants
const BTN_PRIMARY = "group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center";
const BTN_SECONDARY = "bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl";

// Badge Constants
const BADGE = "inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-8";

// Spacing Constants
const MB_2 = "mb-2";
const MB_3 = "mb-3";
const MB_4 = "mb-4";
const MB_6 = "mb-6";
const MB_8 = "mb-8";
const MB_12 = "mb-12";
const MB_16 = "mb-16";
const MT_8 = "mt-8";
const MX_AUTO = "mx-auto";
const MX_3 = "mx-3";
const MR_2 = "mr-2";
const ML_2 = "ml-2";

// Animation Constants
const TRANSFORM_TRANSITION = "transform transition-all duration-1000";
const TRANSFORM_VISIBLE = "translate-y-0 opacity-100";
const TRANSFORM_HIDDEN = "translate-y-10 opacity-0";
const TRANSFORM_DELAY_300 = "delay-300";
const TRANSFORM_DELAY_700 = "delay-700";
const TRANSFORM_DELAY_900 = "delay-900";
const TRANSFORM_DELAY_1100 = "delay-1100";
const TRANSFORM_SCALE = "scale-105 shadow-lg";
const TRANSFORM_HOVER_SCALE = "hover:scale-105";
const TRANSFORM_ARROW = "group-hover:translate-x-1 transition-transform";

// Icon Constants
const ICON_SM = "w-4 h-4";
const ICON_MD = "w-5 h-5";
const ICON_LG = "w-6 h-6";
const ICON_XL = "w-8 h-8";

// Divider Constants
const DIVIDER = "h-8 w-px bg-gray-200";

// Background Constants
const BG_WHITE = "bg-white";
const BG_BLUE_50 = "bg-blue-50";
const BG_BLUE_100 = "bg-blue-100";

// Border Constants
const BORDER_BLUE_200 = "border border-blue-200";
const BORDER_GRAY_100 = "border border-gray-100";
const BORDER_T_GRAY_100 = "border-t border-gray-100";

// Opacity Constants
const OPACITY_60 = "opacity-60";

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveFeature(prev => (prev + 1) % 4);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: Shield,
            title: "Secure Shopping",
            description: "Your data and payments are fully protected with enterprise-grade security.",
            color: "text-blue-600"
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            description: "Express shipping available with real-time tracking for all orders.",
            color: "text-green-600"
        },
        {
            icon: Star,
            title: "Premium Quality",
            description: "Carefully curated products from trusted brands and verified sellers.",
            color: "text-yellow-600"
        },
        {
            icon: Zap,
            title: "Instant Support",
            description: "24/7 customer service ready to help with any questions or concerns.",
            color: "text-purple-600"
        }
    ];

    const stats = [
        { number: "50K+", label: "Happy Customers" },
        { number: "100K+", label: "Products Sold" },
        { number: "4.9", label: "Average Rating" },
        { number: "24/7", label: "Support Available" }
    ];

    return (
        <div className={PAGE_CONTAINER}>
            {/* Hero Section */}
            <div className={BG_WHITE}>
                <div className={`${SECTION_CONTAINER} ${SECTION_PADDING}`}>
                    <div className={TEXT_CENTER}>
                        <div className={`${TRANSFORM_TRANSITION} ${isVisible ? TRANSFORM_VISIBLE : TRANSFORM_HIDDEN}`}>
                            {/* Badge */}
                            <div className={BADGE}>
                                <Check className={`${ICON_SM} ${MR_2}`} />
                                Trusted by thousands of customers
                            </div>

                            {/* Main Heading */}
                            <h1 className={`${TEXT_4XL} sm:${TEXT_6XL} ${FONT_BOLD} ${TEXT_GRAY_900} ${MB_6} ${LEADING_TIGHT}`}>
                                Shop Smart,
                                <span className={`${TEXT_BLUE_600} block`}>Live Better</span>
                            </h1>

                            {/* Subheading */}
                            <p className={`${TEXT_XL} ${TEXT_GRAY_600} ${MB_12} ${MAX_W_3XL} ${MX_AUTO} ${LEADING_RELAXED}`}>
                                Discover premium products at unbeatable prices. From everyday essentials to luxury items,
                                we've got everything you need with secure checkout and fast delivery.
                            </p>

                            {/* CTA Buttons */}
                            <div className={`${FLEX_COL} sm:${FLEX_ROW} ${GAP_4} justify-center items-center ${MB_16}`}>
                                <Link to='/products'>
                                    <button className={BTN_PRIMARY}>
                                        Start Shopping
                                        <ArrowRight className={`${ICON_MD} ${ML_2} ${TRANSFORM_ARROW}`} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20">
                <div className={SECTION_CONTAINER}>
                    <div className={`${TEXT_CENTER} ${MB_16} ${TRANSFORM_TRANSITION} ${TRANSFORM_DELAY_300} ${isVisible ? TRANSFORM_VISIBLE : TRANSFORM_HIDDEN}`}>
                        <h2 className={`${TEXT_3XL} sm:${TEXT_4XL} ${FONT_BOLD} ${TEXT_GRAY_900} ${MB_4}`}>
                            Why Choose Us?
                        </h2>
                        <p className={`${TEXT_XL} ${TEXT_GRAY_600} ${MAX_W_2XL} ${MX_AUTO}`}>
                            We're committed to providing you with the best shopping experience possible.
                        </p>
                    </div>

                    <div className={`${GRID_COLS_1_MD_2_LG_4} ${GAP_8}`}>
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className={`${CARD_BASIC} transform ${activeFeature === index ? TRANSFORM_SCALE : TRANSFORM_HOVER_SCALE} ${isVisible ? TRANSFORM_VISIBLE : TRANSFORM_HIDDEN}`}
                                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                                >
                                    <div className={`${CARD_ICON} ${feature.color}`}>
                                        <Icon className={ICON_LG} />
                                    </div>
                                    <h3 className={`${TEXT_XL} ${FONT_SEMIBOLD} ${TEXT_GRAY_900} ${MB_3}`}>{feature.title}</h3>
                                    <p className={`${TEXT_GRAY_600} ${LEADING_RELAXED}`}>{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className={`${BG_WHITE} py-16`}>
                <div className={SECTION_CONTAINER}>
                    <div className={`${GRID_COLS_2_MD_4} ${GAP_8} ${TRANSFORM_TRANSITION} ${TRANSFORM_DELAY_700} ${isVisible ? TRANSFORM_VISIBLE : TRANSFORM_HIDDEN}`}>
                        {stats.map((stat, index) => (
                            <div key={index} className={TEXT_CENTER}>
                                <div className={`${TEXT_3XL} sm:${TEXT_4XL} ${FONT_BOLD} ${TEXT_GRAY_900} ${MB_2}`}>
                                    {stat.number}
                                </div>
                                <div className={`${TEXT_GRAY_600} ${FONT_MEDIUM}`}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20">
                <div className={`${MAX_W_4XL} ${MX_AUTO} px-4 ${TEXT_CENTER}`}>
                    <div className={`${CARD_CTA} ${TRANSFORM_TRANSITION} ${TRANSFORM_DELAY_900} ${isVisible ? TRANSFORM_VISIBLE : TRANSFORM_HIDDEN}`}>
                        <div className={CARD_CTA_ICON}>
                            <ShoppingBag className={`${ICON_XL} ${TEXT_BLUE_600}`} />
                        </div>

                        <h2 className={`${TEXT_3XL} sm:${TEXT_4XL} ${FONT_BOLD} ${TEXT_GRAY_900} ${MB_4}`}>
                            Ready to Start Shopping?
                        </h2>

                        <p className={`${TEXT_XL} ${TEXT_GRAY_600} ${MB_8} ${MAX_W_2XL} ${MX_AUTO}`}>
                            Join thousands of satisfied customers and discover your next favorite product today.
                        </p>

                        <div className={`${FLEX_COL} sm:${FLEX_ROW} ${GAP_4} justify-center`}>
                            <Link to='/products'>
                                <button className={BTN_SECONDARY}>
                                    Browse Products
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Section */}
            <div className={`${BG_WHITE} ${BORDER_T_GRAY_100} py-12`}>
                <div className={SECTION_CONTAINER}>
                    <div className={`${FLEX_WRAP} ${GAP_8} ${OPACITY_60} ${TRANSFORM_TRANSITION} ${TRANSFORM_DELAY_1100} ${isVisible ? 'translate-y-0 opacity-60' : TRANSFORM_HIDDEN}`}>
                        <div className={`${TEXT_GRAY_400} ${FONT_SEMIBOLD}`}>TRUSTED BY</div>
                        <div className={DIVIDER}></div>
                        <div className={`${TEXT_GRAY_500} ${FONT_MEDIUM}`}>10,000+ Customers</div>
                        <div className={DIVIDER}></div>
                        <div className={`${TEXT_GRAY_500} ${FONT_MEDIUM}`}>Secure Payments</div>
                        <div className={DIVIDER}></div>
                        <div className={`${TEXT_GRAY_500} ${FONT_MEDIUM}`}>Fast Delivery</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;