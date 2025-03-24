export const Prompt = `
Convert the following data into a **valid JSON format** and return only the JSON object without any extra text.

Ensure the JSON structure follows this format:

{
  "posts": [
    {
      "title": "image_filename.jpg",
      "image_des": "Short image description",
      "caption": "Instagram caption with hashtags"
    }
  ]
}
Ensure:
1. The JSON is **properly formatted** and **valid**.
2. Each **post object** contains:
   - "title" → The image filename.
   - "image_des" → A short description of the image.
   - "caption" → A formatted caption with hashtags.
3. Do not include any extra text or explanations.
`;