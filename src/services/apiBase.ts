export const getApiBaseUrl = (): string => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    if (!apiUrl) return '';
    return apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
};

export const buildApiUrl = (path: string): string => {
    const base = getApiBaseUrl();
    return `${base}${path}`;
};
