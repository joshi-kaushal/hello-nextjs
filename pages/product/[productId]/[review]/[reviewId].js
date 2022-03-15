import { useRouter } from "next/router";

export default function Review() {
  const router = useRouter();

  const { productId, reviewId } = router.query;

  return (
    <>
      <h2>
        Review <em>{reviewId}</em> for product <em>{productId}</em>
      </h2>
    </>
  );
}
