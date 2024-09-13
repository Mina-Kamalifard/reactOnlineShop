import { useProducts } from "../context/ProductContext";
import Card from "../components/Card";

import styles from "./ProductsPage.module.css";
import Loader from "../components/Loader";
const ProductsPage = () => {
  const products = useProducts();
  console.log(products);
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        {!products.length && <Loader />}
        {products.map((p) => (
          <Card key={p.id} data={p} />
        ))}
      </div>
      <div>SideBar</div>
    </div>
  );
};

export default ProductsPage;
