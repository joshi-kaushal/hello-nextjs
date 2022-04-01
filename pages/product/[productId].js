import { useRouter } from "next/router";

export default function ProductDetail({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const response = await fetch(
    `http://localhost:3001/products/${params.productId}`
  );
  const product = await response.json();

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { productId: "1" } }],
    fallback: true,
  };
}
