import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { ProductView } from "@/components/ui/ProductView";

interface Props {
  params: Promise<{ slug: string }> | { slug: string }; // <-- allow both
}

async function getProduct(slug: string) {
  if (!slug) {
    console.log("No slug provided to getProduct");
    return null;
  }

  const allProductsQuery = groq`*[_type == "product"]{
    _id,
    name,
    "slug": slug.current
  }`;

  try {
    const allProducts = await client.fetch(allProductsQuery);
    console.log("All available products:", allProducts);
    console.log("Looking for slug:", slug);

    const query = groq`*[_type == "product" && slug.current match $slug][0]{
      _id,
      name,
      basePrice,
      currency,
      description,
      "slug": slug.current,
      image {
        asset->{
          _id,
          url
        }
      },
      "additionalImages": additionalImages[] {
        asset->{
          _id,
          url
        }
      },
      variants[] {
        storage,
        ram,
        additionalPrice,
        stock
      },
      categories[]->
    }`;

    const product = await client.fetch(query, { slug });
    console.log("Found product:", product);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function Page({ params }: Props) {
  const resolvedParams = await Promise.resolve(params); // <-- handles both sync/async cases
  const slug = resolvedParams?.slug;

  if (!slug) {
    console.log("No slug in params");
    return notFound();
  }

  const product = await getProduct(slug);

  if (!product) {
    console.log("No product found for slug:", slug);
    return notFound();
  }

  return <ProductView product={product} />;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;

  if (!slug) {
    return { title: "Product Not Found" };
  }

  const product = await getProduct(slug);

  return {
    title: product?.name || "Product Not Found",
  };
}
