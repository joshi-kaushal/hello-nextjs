import Link from "next/link";

export default function Product() {
  return (
    <>
      <h1>Products</h1>
      <h2>Product 01</h2>
      <h2>Product 02</h2>
      <h2>Product 03</h2>

      <Link href="/" passHref>
        <h4>Go Home</h4>
      </Link>
    </>
  );
}
