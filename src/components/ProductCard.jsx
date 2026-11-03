import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product, onRemove }) => {
  const { id, name, price, inStock } = product;
  const availabilityClass = inStock ? styles.inStock : styles.outOfStock;

  return (
    <Card
      className={`${styles.card} ${availabilityClass} ${inStock ? '' : 'outOfStockClass'}`}
      component="article"
      elevation={0}
      data-product-id={id}
    >
      <CardContent className={`${styles.content} ${inStock ? '' : 'outOfStockClass'}`}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <div className={styles.productMark} aria-hidden="true">
            {name.slice(0, 1).toUpperCase()}
          </div>
          <Chip
            className={`${styles.status} ${availabilityClass}`}
            label={inStock ? 'In stock' : 'Out of stock'}
            size="small"
          />
        </Stack>
        <Typography component="h3" className={styles.name}>
          {name}
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography className={styles.price}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(price)}
          </Typography>
          {onRemove && (
            <Button
              className={styles.removeButton}
              onClick={() => onRemove(id)}
              size="small"
              color="inherit"
              aria-label={`Remove ${name}`}
            >
              Remove
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inStock: PropTypes.bool.isRequired,
  }).isRequired,
  onRemove: PropTypes.func,
};

export default ProductCard;
