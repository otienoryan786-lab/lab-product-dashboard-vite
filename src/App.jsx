import { useMemo, useState } from 'react';
import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import ProductList from './components/ProductList';
import './App.css';

const initialProducts = [
  { id: 1, name: 'Laptop', price: 999.99, inStock: true },
  { id: 2, name: 'Phone', price: 699, inStock: false },
  { id: 3, name: 'Tablet', price: 499, inStock: true },
  { id: 4, name: 'Wireless Earbuds', price: 189.5, inStock: true },
];

const filters = [
  { value: 'all', label: 'All products' },
  { value: 'available', label: 'In stock' },
  { value: 'unavailable', label: 'Out of stock' },
];

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState('all');

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        if (filter === 'available') return product.inStock;
        if (filter === 'unavailable') return !product.inStock;
        return true;
      }),
    [filter, products],
  );
  const inStockCount = products.filter((product) => product.inStock).length;

  const removeProduct = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  };

  return (
    <Box className="app-shell">
      <Container maxWidth="lg" className="dashboard">
        <Box component="header" className="dashboard-header">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
            spacing={3}
          >
            <Box>
              <Typography className="eyebrow">YOUR CATALOG, AT A GLANCE</Typography>
              <Typography component="h1" className="dashboard-title">
                Product Dashboard
              </Typography>
              <Typography className="dashboard-subtitle">
                Keep your inventory organized and your next great find in reach.
              </Typography>
            </Box>
            <Chip
              className="inventory-chip"
              label={`${inStockCount} ${inStockCount === 1 ? 'item' : 'items'} in stock`}
              color="success"
              variant="outlined"
            />
          </Stack>
        </Box>

        <Box component="section" aria-label="Product inventory">
          <Stack
            className="product-toolbar"
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', sm: 'center' }}
            spacing={2}
          >
            <Box>
              <Typography component="h2" className="section-title">
                Inventory
              </Typography>
              <Typography className="section-caption">
                {products.length} {products.length === 1 ? 'product' : 'products'} in your catalog
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} className="filter-group" aria-label="Filter products">
              {filters.map((option) => (
                <Button
                  key={option.value}
                  className="filter-button"
                  variant={filter === option.value ? 'contained' : 'outlined'}
                  onClick={() => setFilter(option.value)}
                  aria-pressed={filter === option.value}
                >
                  {option.label}
                </Button>
              ))}
            </Stack>
          </Stack>

          <ProductList
            products={filteredProducts}
            hasInStockProducts={inStockCount > 0}
            onRemove={removeProduct}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default App;
