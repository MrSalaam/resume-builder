# 🚀 AI-Powered Resume Builder

This is a modern, feature-rich resume builder designed to help you craft a professional and visually appealing resume with ease. Built with a powerful tech stack, it offers a seamless, real-time editing experience and leverages AI to enhance your content.


## ✨ Key Features

- **Real-Time Preview**: See your resume update instantly as you type. The split-screen layout provides immediate visual feedback.
- **AI-Powered Summary**: Generate a compelling professional summary with a single click, powered by the Gemini API.
- **Responsive & Animated UI**: Smooth animations and transitions powered by `framer-motion` create an engaging user experience.
- **Comprehensive Sections**: Includes all essential resume sections:
  - Personal Information
  - Professional Summary
  - Work Experience
  - Education
  - Skills & Expertise
  - Projects
- **Dynamic Forms**: Easily add, edit, and remove multiple entries for experience, education, and projects.
- **PDF Export**: A clean, print-optimized stylesheet allows you to export your final resume as a high-quality PDF directly from the browser.


## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/) 19 & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI**: [Google Gemini API](https://ai.google.dev/)

## ⚙️ Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MrSalaam/resume-builder.git
    cd resume-builder
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # or npm install
    # or yarn install
    ```

3.  **Set up environment variables:**

    The AI summary generation feature requires a Google Gemini API key.

    - Create a `.env` file in the root of the project.
    - Add your API key to the file:
      ```
      VITE_GEMINI_API_KEY=your_api_key_here
      ```
    - You can get a free API key from Google AI Studio.

### Running the Development Server

To start the Vite development server, run:

```bash
pnpm dev
# or npm run dev
```

Open http://localhost:5173 (or the port shown in your terminal) to view the application in your browser.

## 🚀 Available Scripts

- `pnpm dev`: Starts the development server with Hot Module Replacement (HMR).
- `pnpm build`: Compiles the TypeScript code and builds the application for production.
- `pnpm lint`: Lints the codebase using ESLint.
- `pnpm preview`: Serves the production build locally to preview it.

## 📄 How to Export as PDF

1.  Fill out your resume details in the form.
2.  The preview pane will update in real-time.
3.  Once you are satisfied, click the **"Export as PDF"** button at the bottom of the preview pane.
4.  This will trigger your browser's print dialog.
5.  In the print dialog settings:
    - Set the **Destination** to **"Save as PDF"**.
    - Ensure **"Background graphics"** is enabled to include colors and styles.
    - Set **Margins** to **"None"** for the best layout.
6.  Click **Save** to download your resume.

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find any bugs, feel free to open an issue or submit a pull request.

---

*This project was bootstrapped with Vite.*
