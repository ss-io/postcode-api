This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is a postcode search demo app.

## Getting Started

First install packages

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

API endpoint located in [http://localhost:3000/app/search/by-postcode](http://localhost:3000/app/search/by-postcode)

```bash
GET: search/by-postcode/:postcode
GET: search/by-postcode/:postcode1,postcode2....

POST: Not allowed
```
