import {currentUser} from '@clerk/nextjs/server';
import {db} from '@/lib/db';

export const checkUser = async () => {
   const user = await currentUser();
    //check for current loggedin clerk user
    if(!user){
        return null;
    }

    // check if user is already in the database
    const loggedInUser = await db.user.findUnique({
        where:{
            clerkUserId: user.id
        }
    });
    
    // if user is in db return user
    if(loggedInUser){
        return loggedInUser;
    }
    //if not in db create new user
    const newUser = await db.user.create({
        data: {
            clerkUserId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        }
    })
    return newUser;
}