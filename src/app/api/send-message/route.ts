import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { Message } from '@/models/User.model'

export async function POST(request: Request) {

    await dbConnect();
    const { username, content } = await request.json();

    try {

        const user = await UserModel.findOne({ username: username }).exec();

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: 'User not found'
                },
                {
                    status: 404
                }
            )
        }

        // Check if the user is accepting messages
        if (!user.isAcceptingMessages) {
            return Response.json(
                {
                    success: false,
                    message: 'User is not accepting messages'
                },
                {
                    status: 400
                }
            )
        }

        const newMessage = {
            content: content,
            createdAt: new Date()
        }

        // Push the new message to the user's messages array
        user.messages.push(newMessage as Message);
        await user.save();

        return Response.json(
            {
                success: true,
                message: 'Message sent successfully'
            },
            {
                status: 201
            }
        )

    } catch (error) {
        console.log('Error sending message', error);

        return Response.json(
            {
                success: false,
                message: 'Error sending message'
            },
            {
                status: 500
            }
        )

    }
}