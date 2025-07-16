const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchProductsFromApi = async ({ page, limit, sortBy, sortOrder, name }) => {
    const params = new URLSearchParams({
        page,
        limit,
        sortBy,
        sortOrder,
    });

    if (name?.trim()) {
        params.append('name', name);
    }

    const response = await fetch(`${API_BASE_URL}/products?${params}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};
