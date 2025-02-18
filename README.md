# ALMA - Assessment

This project provides a public form for submitting leads, an admin panel for reviewing and updating leads, and secure authentication for admin access.

## Technologies Used

- **Next.js (App Router):**  
  Enables file-based routing, serverless API routes, and efficient rendering of both server and client components.
  
- **NextAuth.js:**  
  Provides secure, credentials-based authentication using JWT sessions, simplifying user login and session management.

- **React Hook Form & Zod:**  
  Efficiently manage form state and validate user input against a defined schema, reducing boilerplate and ensuring data integrity.

- **Tailwind CSS:**  
  Offers a utility-first approach to styling that accelerates development and ensures a responsive, modern design.

- **TypeScript:**  
  Adds strong type safety, helping catch errors early and improving code maintainability.

## Running Locally

1. **Clone the Repository:**
   ```
   git clone https://github.com/emirakhmetov/alma_assessment.git

2. **Install dependencies:**
    ```
    npm install
3. **Set Up Environment Variables**
    ```
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-random-secret
4. **Run the Development Server**
    ```
    npm run dev
    http://localhost:3000/
