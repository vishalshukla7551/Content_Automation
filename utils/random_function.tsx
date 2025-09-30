import Swal from "sweetalert2";
import axios from "axios";
import { chatSession } from '@/utils/AiModal'
export function generateRandomString(length:any) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  

  export async function jsoninsta(Prompt:any,setloading: (arg: boolean) => void,content:any,router:any){
    
    setloading(true);
    let cleanedText;
    try{
      Swal.fire({
        title: "Initiate",
        text: "Analysing Data...",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading(); // Show loading spinner
        }
    });
      const AIPrompt =Prompt ;
  const FinalAIPrompt=JSON.stringify(content)+", "+AIPrompt;
    const result=await chatSession.sendMessage(FinalAIPrompt);
    Swal.close();
      cleanedText = result?.response.text().trim().replace(/^```json|```$/g, "");
      const finaljson=cleanedText.posts;
      console.log("jsonwithout parse",cleanedText);
// const jsonData = JSON.parse(cleanedText);

const parsedJson = JSON.parse(cleanedText);
console.log("Parsed JSON Output:", parsedJson);
const updatedPosts = [];
    
for (const [index, post] of parsedJson.posts.entries()) {
  const string=generateRandomString(10);
    try {
      
      Swal.fire({
        title: `Step ${(index+1)} of 3`,
        text: `Processing Image ${(index+1)}...`,
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading(); // Show loading spinner
        }
    });
        const imageUrl = await axios.post("/api/generateImage", {                //generate Image
            imagepath: `${string}.jpeg`,    
            prompt: post.image_des,
        });      
        console.log(imageUrl);
        updatedPosts.push({ ...post, imageUrl: imageUrl.data.publicUrl});
        Swal.close();
    } catch (error) {
      Swal.fire({
        title: `Step ${(index+1)} of 3`,
        text: `Processing Image ${index} Failed`,
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading(); // Show loading spinner
        }
    });
        console.error("Error generating image:", error);
        Swal.close();
        updatedPosts.push({ ...post, imageUrl: "/placeholder.jpg" });
      
    }
}
    
// ✅ Stringify JSON before encoding it for URL
cleanedText = JSON.stringify({posts:updatedPosts});
      router.push(`/content_post?content=${encodeURIComponent(cleanedText)}`)
    console.log("Event")
  }
    catch(error){
      console.log("Error in creating Proper organised formate");}
      finally{
        console.log("ok");
        setloading(false);
      }
      }


export async function jsonlinkedin(Prompt1:any,setloading: (arg: boolean) => void,content:any,router:any){
    
        setloading(true);
        let cleanedText;
        try{
          Swal.fire({
            title: "Initiate",
            text: "Analysing Data...",
            icon: "info",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading(); // Show loading spinner
            }
        });
          const AIPrompt =Prompt1 ;
      const FinalAIPrompt=JSON.stringify(content)+", "+AIPrompt;
        const result=await chatSession.sendMessage(FinalAIPrompt);
        Swal.close();
          cleanedText = result?.response.text().trim().replace(/^```json|```$/g, "");
          const finaljson=cleanedText.posts;
          console.log("jsonwithout parse",cleanedText);
    // const jsonData = JSON.parse(cleanedText);
    
    const parsedJson = JSON.parse(cleanedText);
    console.log("Parsed JSON Output:", parsedJson);
    const updatedPosts = [];
        
    for (const [index, post] of parsedJson.posts.entries()) {
      const string=generateRandomString(10);
        try {
          
          Swal.fire({
            title: `Step ${(index+1)} of 3`,
            text: `Processing Image ${(index+1)}...`,
            icon: "info",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading(); // Show loading spinner
            }
        });
            const imageUrl = await axios.post("/api/generateImage", {                //generate Image
                imagepath: `${string}.jpeg`,    
                prompt: post.image_des,
            });      
            console.log(imageUrl);
            updatedPosts.push({ ...post, imageUrl: imageUrl.data.publicUrl});
            Swal.close();
        } catch (error) {
          Swal.fire({
            title: `Step ${(index+1)} of 3`,
            text: `Processing Image ${index} Failed`,
            icon: "info",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading(); // Show loading spinner
            }
        });
            console.error("Error generating image:", error);
            Swal.close();
            updatedPosts.push({ ...post, imageUrl: "/placeholder.jpg" });
          
        }
    }
        
    // ✅ Stringify JSON before encoding it for URL
    cleanedText = JSON.stringify({posts:updatedPosts});
         router.push(`/content_post_linkedin?content=${encodeURIComponent(cleanedText)}`)
        console.log("Event")
      }
        catch(error){
          console.log("Error in creating Proper organised formate");}
          finally{
            console.log("ok");
            setloading(false);
          }
          }