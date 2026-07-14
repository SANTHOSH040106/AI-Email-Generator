const { InferenceClient } = require("@huggingface/inference");

async function generateEmail(prompt) {
  try {
    console.log("========== HF DEBUG ==========");
    console.log("HF Key Exists:", !!process.env.HF_API_KEY);

    if (process.env.HF_API_KEY) {
      console.log(
        "HF Key Prefix:",
        process.env.HF_API_KEY.substring(0, 5)
      );
    } else {
      console.log("HF Key NOT FOUND");
    }

    const client = new InferenceClient(process.env.HF_API_KEY);

    const response = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    console.log("HF Response Success");

    return response.choices[0].message.content;

  } catch (error) {

    console.error("========== HF ERROR ==========");
    console.error(error);

    throw error;
  }
}

module.exports = generateEmail;