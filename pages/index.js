import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/product");
  };

  return (
    <div>
      <Head>
        <title>Kaushal Joshi | Learning Next.js</title>
        <meta name="description" content="Learning Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello Next.js!</h1>
        <p>I am being pre-rendered :)</p>

        <Link href="/users" passHref>
          <h2>Users</h2>
        </Link>
        <Link href="/posts" passHref>
          <h2>Posts</h2>
        </Link>
      </main>
    </div>
  );
}
