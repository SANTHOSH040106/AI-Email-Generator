require("dotenv").config();

const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_API_KEY);

async function test() {
  try {
    const response = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "user",
          content: "Say hello",
        },
      ],
    });

    console.log("✅ Hugging Face Working");
    console.log(response.choices[0].message.content);
  } catch (err) {
    console.error("❌ Hugging Face Error:");
    console.error(err);
  }
}

test();