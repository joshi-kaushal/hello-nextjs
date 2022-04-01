import Link from "next/link";

export default function Product({ products }) {
  return (
    <>
      <h1>List of products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>
            {product.id} - {product.title} - ${product.price}
          </h2>
          <hr />
        </div>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3001/products");
  const products = await response.json();

  return {
    props: {
      products,
    },
  };
}
