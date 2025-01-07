import prisma from "./prisma";


 const getNGOPosts = async (ngoId: number) => {
    try {
      const posts = await prisma.nGOPost.findMany({
        where: { ngo_id: ngoId },
        select: {
          post_id: true,
          title: true,
          item_details: true,
          reason: true,
          address: true,
          packaging_instructions: true,
          status: true,
          created_at: true,
        },
      });
      return posts;
    } catch (error) {
      console.error("Error fetching NGO posts:", error);
      throw new Error("Failed to fetch posts.");
    }
  };

 const deleteNGOPost = async (postId: number, ngoId: number) => {
  try {
    // Check if the post exists and belongs to the NGO
    const post = await prisma.nGOPost.findUnique({
      where: { post_id: postId },
    });

    if (!post || post.ngo_id !== ngoId) {
      throw new Error("Post not found or unauthorized access.");
    }

    // Check for associated donations
    const hasDonations = await prisma.donation.count({
      where: { post_id: postId },
    });

    if (hasDonations > 0) {
      throw new Error("Cannot delete a post with active donations.");
    }

    // Delete the post
    await prisma.nGOPost.delete({
      where: { post_id: postId },
    });

    return { message: "Post deleted successfully." };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post.");
  }
};

  export{ getNGOPosts ,deleteNGOPost}