import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import prisma from "./prisma";

export async function getUserId(req: any, res: any) {
    // Fetch the session
    const session = await getServerSession(req, res, AuthOptions);
    
    if (!session || !session.user?.email) {
        throw new Error("User is not authenticated or session is missing.");
    }

    // Query the user by email from the database
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    return user?.user_id;
}
