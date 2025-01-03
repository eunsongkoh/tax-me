
# taxMe 

"your grocery sidekick"

taxMe is an app that makes grocery shopping easier. 
Simply add items to your cart as you shop, and the app automatically calculates and applies the correct tax based on the items in your cart. It’s a simple way to keep track of your purchases and taxes while you shop while staying in budget. 

Due to hosting costs, taxMe won't be going into production (yet)!



## Features

- Guest Mode & User Mode: Choose between a fast checkout experience with Guest Mode or sign in to track your purchases and manage your budget with User Mode.

- Purchase History & Budget Tracking: Effortlessly track your purchase history over time and check if you're staying within your budget for the current month.

- AI-powered Chef Chatbot: Receive personalized recipe recommendations from our "Chef" chatbot based on the items currently in your cart, making meal planning a breeze.

- Real-Time Cart Tax Calculation: Instantly see and track the taxes being applied to your cart, ensuring transparency as you shop.

- Real-Time Budget Progress Bar: Stay on top of your spending with a dynamic progress bar that shows whether you're staying within your budget as you shop.

## In-Progress Features

- Automatic Price Tag Identification: Using Microsoft's Computer Vision API to automatically detect and identify price tags 

- Text-to-Speech Accessibility: Implementing a text-to-speech feature to assist users with visual impairments


## Tech Stack

**Frontend:** Next.js, Redux, TailwindCSS, NextUI 

**[Backend](https://github.com/eunsongkoh/tax-backend):** Springboot, Java, Microsoft Azure SQL Server 


## Screenshots

![Home Page](https://github.com/user-attachments/assets/589ef812-7dfe-4e99-810f-935682e61bb3)
![Cart View](https://github.com/user-attachments/assets/24bf04dc-688e-482c-a7c1-e202245a0485)
![Add Item](https://github.com/user-attachments/assets/9902d4ba-8eb5-44fc-b4cc-969fb9cef047)
![Chat with the Chef](https://github.com/user-attachments/assets/d9c5e9ad-0e3e-4334-bb93-fd0eb913091f)
![Dashboard](https://github.com/user-attachments/assets/8ea3bb0e-ea08-41b7-a00a-1802b5421130)


## Related
[taxMe Backend](https://github.com/eunsongkoh/tax-backend)

## Run Locally

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
