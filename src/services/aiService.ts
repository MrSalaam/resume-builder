import type { ResumeData } from '../contexts/ResumeContext';

// Custom error types for better error handling
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class APIError extends Error {
  public status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

const fetchWithRetry = async (url: string, options: RequestInit, retries = 3, backoff = 300): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      // Retry on 429 (Too Many Requests) and 5xx server errors
      if (response.status === 429 || (response.status >= 500 && response.status <= 599)) {
        if (i === retries - 1) return response; // Last retry, return the response to be handled
        // Exponential backoff
        const delay = backoff * Math.pow(2, i) + Math.random() * 100;
        console.warn(`API request failed with status ${response.status}. Retrying in ${Math.round(delay)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      return response;
    } catch (error) {
      if (i === retries - 1) throw error; 
    }
  }
  throw new APIError("API request failed after multiple retries.", 500);
};

export const generateAISummary = async (userData: ResumeData): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Gemini API key is not set. Please add it to your .env file (VITE_GEMINI_API_KEY=...).");
    throw new APIError("AI summary generation is not configured. Please set up your API key.");
  }

  try {
    const { jobTitle, skills, experiences } = userData;

    if (!jobTitle && !skills && !experiences) {
      throw new ValidationError("Please add a job title, skills, or experience to generate an AI summary.");
    }

    const skillsList = skills?.map(s => s.name).join(', ') || '';
    const experienceSummary = experiences
      ?.map(exp => `- ${exp.jobTitle} at ${exp.company}: ${exp.description}`)
      .join('\n') || '';

    const promptParts = [
      "Based on the following resume details, write a professional summary of 2-3 sentences.",
      "The tone should be confident and professional, highlighting key strengths and experience."
    ];

    if (jobTitle) promptParts.push(`Target Job Title: ${jobTitle}`);
    if (skillsList) promptParts.push(`Skills: ${skillsList}`);
    if (experienceSummary) promptParts.push(`Experience Highlights:\n${experienceSummary}`);

    promptParts.push("Focus on creating a compelling summary that would catch a recruiter's attention.");

    const prompt = promptParts.join('\n\n');

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetchWithRetry(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 150,
        }
      }),
    }, 3); 

    if (!response.ok) {
      let errorMessage = `Failed to generate AI summary (Error ${response.status}).`;
      try {
        const errorData = await response.json();
        console.error('Gemini API Error:', errorData);
        // Try to get a more specific error message from the API response
        errorMessage = errorData?.error?.message || errorMessage;
      } catch (e) {
        // The response body was not JSON or was empty
        console.error('Could not parse API error response.');
      }
      throw new APIError(errorMessage, response.status);
    }

    const data = await response.json();

    // Validate response structure
    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Unexpected API response structure:', data);
      throw new APIError("Failed to generate summary. Please try again.");
    }

    const summary = data.candidates[0].content.parts[0].text.trim();

    // Basic validation of the generated summary
    if (summary.length < 20) {
      throw new APIError("Generated summary was too short. Please try again.");
    }

    return summary;

  } catch (error) {
    // Re-throw custom errors as-is for UI to handle
    if (error instanceof ValidationError || error instanceof APIError) {
      throw error;
    }

    console.error('Error generating AI summary:', error);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new APIError("Request timed out. Please try again.");
      } else if (error.message.includes('Failed to fetch')) {
        throw new APIError("Network error. Please check your connection and try again.");
      }
    }

    throw new APIError("Failed to generate AI summary. Please try again later.");
  }
};
