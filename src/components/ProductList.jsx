import { Alert, Box } from '@mui/material';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const ProductList = ({ products, hasInStockProducts, onRemove }) => {
  const hasStock = hasInStockProducts ?? products.some((product) => product.inStock);

  return (
    <>
      {!hasStock && (
        <Alert className="stock-alert" severity="info">
          No products are currently in stock.
        </Alert>
      )}
      {products.length === 0 ? (
        <Box className="empty-state" role="status">
          No products match this filter.
        </Box>
      ) : (
        <Box className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onRemove={onRemove} />
          ))}
        </Box>
      )}
    </>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(ProductCard.propTypes.product).isRequired,
  hasInStockProducts: PropTypes.bool,
  onRemove: PropTypes.func,
};

export default ProductList;
