import { User } from 'lucide-react';

const CustomerInformation = ({ formData, setFormData }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
            <h2 className="text-xl font-semibold text-gray-900">
                <User className="w-5 h-5 inline mr-2" />
                Customer Information
            </h2>
        </div>
        <div className="p-6 space-y-4">
            <input
                type="text"
                value={formData.fullName ?? ''}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                placeholder="Full Name"
                required
            />
            <input
                type="tel"
                value={formData.phone ?? ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                placeholder="Phone Number"
                required
            />
            <textarea
                value={formData.address ?? ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none"
                rows="3"
                placeholder="Address"
                required
            />
        </div>
    </div>
);

export default CustomerInformation;
