---
title: "Nextjs Crud :: Setup"
date: 2021-04-21T20:06:34-06:00
Description: "A crud app w/ nextjs and typescript"
Tags: ["nextjs"]
Categories: ["programming"]
DisableComments: false
---

# Setup

So the gist of the below is that we are creating a starter nextjs application, typescript, converting to yarn and finally
installing both tailwind css and tailwind jit.

```bash
λ> npx create-next-app nextjs-crud --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
λ> cd nextjs-crud
λ> touch tsconfig.json
λ> npm install --save-dev typescript @types/react
λ> rm -f package-lock.json
λ> yarn add -d tailwindcss@latest postcss@latest autoprefixer@latest
λ> npx tailwindcss init -p
λ> yarn add @tailwindcss/jit tailwindcss postcss
```

if you want to learn more about the 'why' you should use the jit instead of
using tailwind directly,

The following are just nice to have when cleaning up the code as we go
```bash
yarn add -D eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-prettier eslint-plugin-react
yarn add -D prettier
```

### Enabling webpack 5 nextjs

Just open up the next.config.js and ensure this is set
```javascript
module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'big-shoulders': ['"Big Shoulders Display"']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

### Adding a custom font

I really wanted to use a fun font, so I ended up grabbing
"big shoulders" from google fonts.

So I added the custom font to the _document.tsx page, namily
because that was the place I saw you could inject information into
the head block

```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800&display=swap" rel="stylesheet"/>
                </Head>
                <body className="bg-gradient-to-r from-yellow-400 via-black-500 to-pink-500">
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
```

Then toss the custom font information into the tailwind css config

```javascript
module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'big-shoulders': ['"Big Shoulders Display"']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

So at this point the code is little more than a nice playground
to get started creating an application. In the upcoming sections
im going to break into how to fetch and work with nextjs as a simple
crud application.

