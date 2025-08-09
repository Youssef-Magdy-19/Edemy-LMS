import { clerkClient } from "@clerk/express"

//  MIddleware ( Protect Educator Routes )
export const protectEducator = async (req , res, next)=>{
    try{
        const userId = req.auth.userId
        const respose = await clerkClient.users.getUser(userId)

        if(respose.publicMetadata.role !== 'educator'){
            return res.json({success: false , message: 'Unauthorized Access'})
        }

        next()

    } catch (error) {
        return res.json({success: false , message: error.message})
    }
}