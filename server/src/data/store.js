// In-memory data store for Week 3.
//
// The seed data matches the Week 2 frontend demo data exactly
// (client/src/data/demoProducts.js): same 8 products, same categories.
// Everything lives in plain arrays — MongoDB/Mongoose arrives in Week 4,
// so restarting the server resets the data to this seed state.

export const categories = [
  { id: 1, name: 'Grocery' },
  { id: 2, name: 'Household' },
  { id: 3, name: 'Snacks' },
  { id: 4, name: 'Beverages' },
  { id: 5, name: 'Personal Care' },
  { id: 6, name: 'Other' },
];

export const products = [
  {
    id: 1,
    name: 'Cooking Oil 5L',
    sku: 'ST-001',
    category: 'Grocery',
    quantity: 12,
    unitPrice: 3200,
    lowStockLimit: 5,
    supplier: 'Hangu Wholesale Market',
  },
  {
    id: 2,
    name: 'Rice Bag 5kg',
    sku: 'ST-002',
    category: 'Grocery',
    quantity: 4,
    unitPrice: 1150,
    lowStockLimit: 5,
    supplier: 'Kohat Grain Market',
  },
  {
    id: 3,
    name: 'Wheat Flour 5kg',
    sku: 'ST-003',
    category: 'Grocery',
    quantity: 18,
    unitPrice: 950,
    lowStockLimit: 5,
    supplier: 'Kohat Grain Market',
  },
  {
    id: 4,
    name: 'Sugar 1kg',
    sku: 'ST-004',
    category: 'Grocery',
    quantity: 2,
    unitPrice: 190,
    lowStockLimit: 5,
    supplier: 'Hangu Wholesale Market',
  },
  {
    id: 5,
    name: 'Tea 500g',
    sku: 'ST-005',
    category: 'Grocery',
    quantity: 0,
    unitPrice: 850,
    lowStockLimit: 3,
    supplier: 'City Traders',
  },
  {
    id: 6,
    name: 'Daal 1kg',
    sku: 'ST-006',
    category: 'Grocery',
    quantity: 9,
    unitPrice: 320,
    lowStockLimit: 4,
    supplier: 'Kohat Grain Market',
  },
  {
    id: 7,
    name: 'Bath Soap',
    sku: 'ST-007',
    category: 'Household',
    quantity: 25,
    unitPrice: 180,
    lowStockLimit: 10,
    supplier: 'City Traders',
  },
  {
    id: 8,
    name: 'Biscuits Pack',
    sku: 'ST-008',
    category: 'Snacks',
    quantity: 7,
    unitPrice: 250,
    lowStockLimit: 5,
    supplier: 'Hangu Wholesale Market',
  },
];

// Stock movements (history). Starts empty; POST /api/products/:id/stock
// appends one entry per stock change.
export const movements = [];

// Id counters — always hand out the next unused id.
export const counters = {
  category: categories.length,
  product: products.length,
  movement: 0,
};
