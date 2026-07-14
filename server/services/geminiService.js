const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_API_KEY);

async function generateEmail(prompt) {
  try {
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

    return response.choices[0].message.content;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = generateEmail;