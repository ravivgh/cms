import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: "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" });

async function generateMCQs(content, numberOfQuestions) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "user",
          "content": `Generate ${numberOfQuestions} multiple-choice questions (MCQs) strictly following this format:

Q: (The question related to the given content)
O: 
A: (Option A)
B: (Option B)
C: (Option C)
D: (Option D, optional if only three options are needed)
answer: (The correct answer, which must exactly match one of the given options: A, B, C, or D)

Base the questions on the following content without including any introductory text or explanations:

"${content}"

Ensure that:
- Each question has a maximum of four options (A, B, C, and optionally D).
- The correct answer strictly matches one of the provided options.
- The options are plausible and not too obvious.
- The correct answer is accurate and based on the provided content.
- The questions assess different aspects of the content to encourage comprehensive understanding.`
        }
      ],
      "model": "llama-3.3-70b-versatile",
      "temperature": 0.7,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": false,
      "stop": null
    });

    const rawText = chatCompletion.choices[0]?.message?.content || "";
    const questionBlocks = rawText.split(/\n\n+/);

    const questions = questionBlocks.map(block => {
      const lines = block.split("\n").map(line => line.trim());
      if (lines.length < 5) return null; // Ensure valid structure

      const question = lines[0]?.split(": ")[1] || "Missing question";

      const options = {};
      let correctAnswer = "";

      
      for (let i = 1; i < lines.length; i++) {
        const [key, value] = lines[i].split(": ");
        if (["A", "B", "C", "D"].includes(key)) {
          options[key] = value || `Option ${key} missing`;
        } else if (key === "answer") {
          correctAnswer = value; 
        }
      }

      
      const orderedOptions = ["A", "B", "C", "D"].filter(option => options[option]).reduce((acc, option) => {
        acc[option] = options[option];
        return acc;
      }, {});

      return { 
        question,
        options: orderedOptions,
        answer: correctAnswer
      };
    }).filter(q => q !== null);

    return { questions };
  } catch (error) {
    console.error("Error generating MCQs:", error);
    return { error: "An error occurred while generating questions." };
  }
}

export default generateMCQs;
