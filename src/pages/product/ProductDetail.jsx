import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Truck, Shield, RotateCcw, Share2, Plus, Minus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api/product-service.js';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import RenderStars from '../../components/RenderStars.jsx';

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchProductById(id);
                setProduct(result);
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <LoadingIndicator />;
    if (error) return <ErrorMessage error={error} />;
    if (!product) return <p className="text-center">Product not found</p>;

    const handleQuantityChange = (delta) => {
        setQuantity(Math.max(1, quantity + delta));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="space-y-4">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">{product.category_name}</p>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                                <RenderStars rating={product.rating} reviews={product.rating_count}></RenderStars>
                                <span className="text-sm text-gray-600 ml-1">
                                    ({product.reviews.length} reviews)
                                </span>
                            </div>
                            <span className="text-sm text-green-600 font-medium">
                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                        </div>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-semibold">Quantity:</span>
                            <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="px-4 py-2 font-medium">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            <button className="p-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3">
                                <Truck className="text-blue-600" size={24} />
                                <div>
                                    <p className="font-semibold">Free Shipping</p>
                                    <p className="text-sm text-gray-600">Orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <RotateCcw className="text-blue-600" size={24} />
                                <div>
                                    <p className="font-semibold">30-Day Returns</p>
                                    <p className="text-sm text-gray-600">Easy returns</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Shield className="text-blue-600" size={24} />
                                <div>
                                    <p className="font-semibold">Quality Guarantee</p>
                                    <p className="text-sm text-gray-600">100% authentic</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Tabs */}
            <div className="mt-16">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8">
                        {['description', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="py-8">
                    {activeTab === 'description' && (
                        <div className="space-y-6">
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="max-w-2xl mx-auto">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                {renderStars(product.rating)}
                                <span className="text-2xl font-bold">{product.rating}</span>
                                <span className="text-gray-600">out of 5</span>
                            </div>
                            <p className="text-gray-600 mb-6 text-center">
                                Based on {product.reviews.length} reviews
                            </p>

                            <ul className="space-y-4 text-left">
                                {product.reviews.map((review) => (
                                    <li key={review.review_id} className="border-b pb-4">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold">{review.username}</p>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
                                    </li>
                                ))}
                            </ul>

                            {product.reviews.length === 0 && (
                                <p className="text-center text-gray-500 mt-6">No reviews yet.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
