import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const myWixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({
    clientId: `769dbdef-f881-43f6-a1e6-3fd88a223411`,
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
