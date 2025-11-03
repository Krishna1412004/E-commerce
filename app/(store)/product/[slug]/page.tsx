import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { ProductView } from "@/components/ui/ProductView";

/**
 * Use a loose 'any' typing for route props to avoid Next.js 15 PageProps
 * constraint issues during build. This is a localized workaround for that bug.
 */
type Product = any; // you can replace with a proper type later

async function getProduct(slug: string): Promise<Product | null> {
  if (!slug) {
    console.log("No slug provided to getProduct");
    return null;
  }

  // Debug: list all products (optional, remove later if noisy)
  const allProductsQuery = groq`*[_type == "product"]{
    _id,
    name,
    "slug": slug.current
  }`;

  try {
    const allProducts = await client.fetch(allProductsQuery);
    console.log("All available products:", allProducts);
    console.log("Looking for slug:", slug);

    const query = groq`*[_type == "product" && slug.current == $slug][0]{
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
      "additionalImages": additionalImages[]{
        asset->{
          _id,
          url
        }
      },
      variants[]{
        storage,
        ram,
        additionalPrice,
        stock
      },
      categories[]->
    }`;

    const product = await client.fetch(query, { slug });
    console.log("Found product:", product);
    return product ?? null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

/**
 * Page component - uses `any` for params to avoid Next.js 15 typing issues.
 */
export default async function Page({ params }: any) {
  // `params` can sometimes be provided as a Promise internally in Next.js 15,
  // but using `any` avoids the build-time PageProps constraint.
  const resolvedParams = await Promise.resolve(params);
  const slug: string | undefined = resolvedParams?.slug;

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

/**
 * generateMetadata for the page (also uses any for params)
 */
export async function generateMetadata({ params }: any) {
  const resolvedParams = await Promise.resolve(params);
  const slug: string | undefined = resolvedParams?.slug;

  if (!slug) {
    return { title: "Product Not Found" };
  }

  const product = await getProduct(slug);

  return {
    title: product?.name || "Product Not Found",
  };
}
