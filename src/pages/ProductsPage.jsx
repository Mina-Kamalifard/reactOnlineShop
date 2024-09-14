import { useProducts } from "../context/ProductContext";
import Card from "../components/Card";
import { useState } from "react";
import styles from "./ProductsPage.module.css";
import Loader from "../components/Loader";
import { ImSearch } from "react-icons/im";

const ProductsPage = () => {
  const products = useProducts();
  console.log(products);
  const [search, setSearch] = useState([]);
  const searchHandler = () => {
    console.log("SEARCH");
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase().trim())}
        />
        <button onClick={searchHandler}>
          <ImSearch />
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.products}>
          {!products.length && <Loader />}
          {products.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <div>SideBar</div>
      </div>
    </>
  );
};

export default ProductsPage;
