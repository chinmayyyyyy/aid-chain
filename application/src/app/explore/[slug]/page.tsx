import PostDetail from "@/components/atom/explore/PostContent";
import Header from "@/components/molecules/dashboard/header";
async function getPostData(slug: string) {
  const res = await fetch(`http://localhost:3000/api/ngoPosts/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch post details");
  return res.json();
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  return (
    <div>
      <Header />
      <PostDetail initialPost={post} />
    </div>
  );
}
