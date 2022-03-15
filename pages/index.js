import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/product");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Kaushal Joshi | Learning Next.js</title>
        <meta name="description" content="Learning Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello Next.js!</h1>

        <section>
          <Link href="/blog">
            <h4>Blog</h4>
          </Link>
          <Link href="/product">
            <h4>Products</h4>
          </Link>
          <button onClick={handleSubmit}>Go to Products</button>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
