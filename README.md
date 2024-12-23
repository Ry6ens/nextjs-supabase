# NextJS - Supabase

## Overview

NextJS - Supabase is a task management application built with Next.js and Supabase. The app allows users to create, update, delete, and manage their tasks efficiently. It is deployed on two platforms: Vercel and AWS Amplify.

## Live URLs

- **Vercel Production**: [https://nextjs-supabase-prod.vercel.app/](https://nextjs-supabase-prod.vercel.app/)
- **Vercel Preview**: [https://nextjs-supabase-preview.vercel.app/](https://nextjs-supabase-preview.vercel.app/)
- **AWS Amplify**: [https://main.d1mwjr5r2wkjvm.amplifyapp.com/](https://main.d1mwjr5r2wkjvm.amplifyapp.com/)

---

## Features

1. **Task Management**
   - Create tasks with fields: title, description, due date, and priority.
   - View tasks in a list format.
   - Filter and sort tasks by due date and priority.
   - Mark tasks as completed.
   - Filter tasks based on status (completed or not completed).

2. **Next.js App Router**
   - Server-side rendering (SSR) for fetching data and rendering pages.

3. **UI/UX with Shadcn/UI**
   - Interactive and visually appealing user interface.
   - Integrated Shadcn/UI components for enhanced user experience.

4. **Supabase Integration**
   - Supabase used for storing and retrieving task data.
   - Server-side actions for handling task creation, updates, and deletions.

5. **Deployment**
   - The application is deployed on:
     - **Vercel Production**: [https://nextjs-supabase-prod.vercel.app/](https://nextjs-supabase-prod.vercel.app/)
     - **Vercel Preview**: [https://nextjs-supabase-preview.vercel.app/](https://nextjs-supabase-preview.vercel.app/) (Preview URL is configured in the `preview.yaml` GitHub Actions file.)
     - **AWS Amplify**: [https://main.d1mwjr5r2wkjvm.amplifyapp.com/](https://main.d1mwjr5r2wkjvm.amplifyapp.com/)

6. **Future Enhancements**
   - Add user authentication with Supabase.
   - Implement notifications for task reminders.

---

## Technologies Used

- **Frontend**: Next.js (App Router), React
- **Backend**: Supabase
- **UI Components**: Shadcn/UI
- **Deployment Platforms**: Vercel, AWS Amplify

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/nextjs-supabase.git
   cd nextjs-supabase
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the project root.
   - Add the following variables:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## Deployment

### Vercel

1. Log in to [Vercel](https://vercel.com/) and create a new project.
2. Link your GitHub repository and configure environment variables.
3. GitHub Actions:
   - The project uses GitHub Actions with `preview.yaml` for preview deployments and `production.yaml` for production.
   - The preview URL is configured in the `preview.yaml` file.
   - Preview deployments are triggered for non-main branch pushes, and production deployments are triggered for `main` branch pushes.

### AWS Amplify

1. Log in to [AWS Amplify](https://aws.amazon.com/amplify/) and create a new app.
2. Link your GitHub repository and configure build settings.
3. Deploy the application.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Shadcn/UI Documentation](https://ui.shadcn.dev/)
