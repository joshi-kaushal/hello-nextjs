import { useRouter } from "next/router";

export default function Doc() {
  const router = useRouter();
  const { params = [] } = router.query;

  if (params.length === 1) {
    return (
      <h1>
        Viewing docs for feature <mark>{params[0]}</mark>
      </h1>
    );
  } else if (params.length === 2) {
    return (
      <h1>
        Viewing docs for feature <mark>{params[0]}</mark> and concept{" "}
        <mark>{params[1]}</mark>
      </h1>
    );
  }

  return <h1>Docs home page</h1>;
}
