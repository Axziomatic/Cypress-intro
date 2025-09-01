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

### Användarflöden

## 1. Logga en måltid

1 Användaren öppnar appen.

2 Går till formuläret för att lägga till mat.

3 Fyller i: namn ("Ägg"), kalorier (150), protein (12), fett (10), kolhydrater (1).

4 Klickar på "Lägg till".

5 Ser att "Ägg" dyker upp i listan för dagens intag.

6 Ser att progress bars uppdateras.

## 2. Överskrida ett mål

1 Användaren har redan ett mål på t.ex. 2000 kalorier.

2 Loggar mat tills progress bar når 2000 kcal.

3 Loggar ytterligare mat som gör att totalen blir > 2000 kcal.

4 Appen visar en varning (t.ex. röd text: "Du har överskridit ditt kalorimål!").

## 3. Se dagens sammanfattning

1 Användaren har loggat flera matintag.

2 Går till "Dagens intag"-sidan.

3 Ser en lista över alla matintag.

4 Ser totalsummor (kalorier, protein, fett, kolhydrater) summerade längst ner.

## 4. Se veckans sammanfattning

1 Användaren har loggat mat under flera dagar (t.ex. 3 dagar).

2 Går till "Veckovy".

3 Ser summerade värden för kalorier, protein, fett och kolhydrater under veckan.

4 (Extra) Ser stapeldiagram eller lista dag för dag.

## 5. Uppdatera sina mål (om du hinner implementera detta)

1 Användaren går till "Mina mål".

2 Ändrar dagligt kalorimål från 2000 → 2500.

3 Klickar Spara.

4 Går tillbaka till dashboard.

5 Ser att progress bars nu använder det nya målet.
