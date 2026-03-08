import { Footer, FooterBanner, Hero, Product } from "../../components";
import { client } from "../../sanity/client";


export default function Home({ products, bannerData }) {
  return (
    <div>
      <Hero herobanner={bannerData.length && bannerData[1]}/>
      <div className="products-heading">
          <h2>Best Selling Products</h2>
          <p>Speaker There are many variations passages of Lorem Ipsum available.</p>
      </div>
      <div className="products-container">
        {/* <Product /> */}
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
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