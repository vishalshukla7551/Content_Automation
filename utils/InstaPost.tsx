const axios = require('axios');

// const ACCESS_TOKEN ="EAATNGhQJ3r4BO0cEuPQ1KxWqI6ZB5MdlER1nfQlyKWwMbaamaeP0KgV7pnDWZBZCMdMNUPCRFp9bJzbR5nGHoUnpRqJpgQKM71WpHZAKeZBAOA0I0Mj1sZA7n5ZBdBZAwvVGLmMgnGZBwothYZCtZAHoKpNrW2LuVEP3HzZBDb4ISS7ZBVoifVvAuvKs8UhZAYRUyqZAfZA2WJ3hHVyn6ALeuRHmDcOQ22b4rOALlZC9a";
// const INSTAGRAM_ACCOUNT_ID = "17841469696092614";
// const IMAGE_URL = "https://picsum.photos/id/237/200/300";
// const CAPTION = "NEW POST";

export async function postToInstagram(ACCESS_TOKEN:any,INSTAGRAM_ACCOUNT_ID:any,IMAGE_URL:any,CAPTION:any) {
    try {
        // console.log("ACCESS_TOKEN",ACCESS_TOKEN);
        // console.log("CAPTION",CAPTION);
        // console.log("IMAGE_URL",IMAGE_URL);
        // console.log("INSTAGRAM_ACCOUNT_ID",INSTAGRAM_ACCOUNT_ID);
        if(!IMAGE_URL&&!CAPTION)
        return {status:1,message:"Please select one post"}
        const uploadResponse = await axios.post(
            `https://graph.facebook.com/v19.0/${INSTAGRAM_ACCOUNT_ID}/media`,
            {
                image_url:IMAGE_URL,
                caption: CAPTION,
                access_token: ACCESS_TOKEN,
            }
        );

        const creationId = uploadResponse.data.id;
        console.log('Media uploaded:', creationId);

        // Publish Image
        const publishResponse = await axios.post(
            `https://graph.facebook.com/v19.0/${INSTAGRAM_ACCOUNT_ID}/media_publish`,
            {
                creation_id: creationId,
                access_token: ACCESS_TOKEN,
            }
        );

        console.log('Post published:', publishResponse.data.id);
        return{status:0,message:"Post Published"}
        // console.log(`http://localhost:3000/${IMAGE_URL}`)
        // console.log(ACCESS_TOKEN)
        // console.log(CAPTION)
    } catch (error) {
        console.error('Error posting to Instagram:');
        console.log(error);
        return{status:2,message:"Failed to post"}
    }
}
