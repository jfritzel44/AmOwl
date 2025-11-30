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

### Required Environment Variables for Production

For the admin login to work in production, you need to set up **Vercel KV** (Key-Value store):

1. **Create a Vercel KV database:**
   - Go to your Vercel project dashboard
   - Navigate to the "Storage" tab
   - Click "Create Database" and select "KV"
   - Follow the setup instructions

2. **Add environment variables:**
   - In your Vercel project settings, go to "Environment Variables"
   - Add the following variables (they should be automatically added when you create the KV database):
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
   - **Optional:** `KV_KEY_PREFIX` - If you're sharing the same KV database across multiple projects, set a unique prefix for each project (e.g., "amowl", "band2") to avoid key conflicts. Defaults to "amowl" if not set.

3. **Optional: Set admin password hash:**
   - You can set `ADMIN_PASSWORD_HASH` to override the default password
   - Generate a hash by running: `node -e "const crypto = require('crypto'); console.log(crypto.createHash('sha256').update('yourpassword').digest('hex'));"`

**Important:** Without Vercel KV configured, admin login will NOT work in production because sessions are stored in memory locally, which doesn't persist across serverless function invocations.

**Sharing KV Database Across Multiple Projects:**
You can reuse the same Upstash KV database for multiple band sites (useful with the free plan's 1 database limit). Just:
1. Connect the same KV database to each Vercel project
2. Set a unique `KV_KEY_PREFIX` environment variable in each project (e.g., "amowl", "band2", "band3")
3. Each project will store its data with the prefix, avoiding conflicts
