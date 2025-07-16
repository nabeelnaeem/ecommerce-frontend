import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api/product-service.js';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import ReviewsDisplay from '../../components/ReviewsDisplay'
import ProductDetailsInfo from '../../components/ProductDetailsInfo.jsx';


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
                        src={product.image || `https://placehold.co/300x300?text=${encodeURIComponent(product.name)}`}
                        alt={product.name}
                        className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
                    />
                </div>

                {/* Product Details */}
                <ProductDetailsInfo
                    product={product}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleQuantityChange={handleQuantityChange}
                />
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
                        <ReviewsDisplay rating={product.rating} reviews={product.reviews} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
