import { useProducts } from '../context/ProductContext'

const ProductsPage = () => {
  const products = useProducts();
  console.log(products);
  return (
    <div>ProductsPage</div>
  )
}

export default ProductsPage