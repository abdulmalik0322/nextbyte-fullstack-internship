// Demo product data for Week 2.
// The backend API arrives in Week 3, so for now the app works with this
// realistic demo data held in memory.
//
// Product photos live in ../assets/ and are imported here, one per product.
// They are real photographs kept as files in the assets folder and imported
// in code (client workflow: photos are handed over as files, we build the
// UI around them). See ../assets/README.txt for each photo's source.

import cookingOilImg from '../assets/cooking-oil-5l.jpg';
import riceBagImg from '../assets/rice-bag-5kg.jpg';
import flourImg from '../assets/flour-5kg.jpg';
import sugarImg from '../assets/sugar-1kg.jpg';
import teaImg from '../assets/tea-500g.jpg';
import daalImg from '../assets/daal-1kg.jpg';
import soapImg from '../assets/soap.jpg';
import biscuitsImg from '../assets/biscuits.jpg';

export const demoProducts = [
  {
    id: 1,
    name: 'Cooking Oil 5L',
    sku: 'ST-001',
    category: 'Grocery',
    quantity: 12,
    unitPrice: 3200,
    lowStockLimit: 5,
    supplier: 'Hangu Wholesale Market',
    image: cookingOilImg,
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
    image: riceBagImg,
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
    image: flourImg,
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
    image: sugarImg,
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
    image: teaImg,
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
    image: daalImg,
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
    image: soapImg,
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
    image: biscuitsImg,
  },
];

// Categories used by the filter dropdown and the add/edit form.
export const categories = ['Grocery', 'Household', 'Snacks', 'Beverages', 'Personal Care', 'Other'];
