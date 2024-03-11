import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const myWixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({
    clientId: `3323d37c-4b3b-45f5-924d-a26065f0871e`,
    tokens: JSON.parse(Cookies.get("session") || null),
  }),
});

export default function Examples() {
  const [examples, setExamples] = useState([]);

  async function fetchExamples() {
    const examples = await myWixClient.items
      .queryDataItems({ dataCollectionId: "examples" })
      .ascending("orderId")
      .find();
    setExamples(examples.items);
  }

  useEffect(() => {
    fetchExamples();
  }, []);

  return (
    <footer>
      {examples.map((example) => (
        <Link href={example.data.slug} key={example._id}>
          <section>
            <h2>
              {example.data.title} <span>-&gt;</span>
            </h2>
            <p>{example.data.description}</p>
          </section>
        </Link>
      ))}
    </footer>
  );
}
