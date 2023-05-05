import Featured from "@/components/Featured";
import Header from "../components/Header";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { IProduct } from "@/interfaces/Product";
import NewProducts from "@/components/NewProducts";


export default function Home({
  product,
  newProducts,
  name,
}: {
  product: IProduct;
  newProducts: [IProduct];
  name: string;
}) {
  
  return (
    <div>
      <Header />
      <Featured product={product} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductID = "64457b5dc5cca341f6b733e6";
  await mongooseConnect();
  const product = await Product.findById(featuredProductID);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
