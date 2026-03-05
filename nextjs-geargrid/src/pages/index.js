import { Footer, Hero } from "../../components";
import { client } from "../../sanity/client";


export default function Home({ products, bannerData }) {
  return (
    <div>
      <Hero herobanner={bannerData.length && bannerData[0]}/>
      <div className="products-heading">
          <h2>Best Selling Products</h2>
          <p>Speaker There are many variations passages of Lorem Ipsum available.</p>
      </div>
      <div className="products-container">
        {/* <Product /> */}
        {products?.map((product, index) => (
          <div key={index} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);
  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}