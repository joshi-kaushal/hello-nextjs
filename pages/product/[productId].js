import { useRouter } from "next/router";

export default function ProductDetail() {
  const router = useRouter();
  const productId = router.query.productId;
  return (
    <h1>
      Details about the product <em>{productId}</em>
    </h1>
  );
}
