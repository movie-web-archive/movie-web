
<p align="center"><img align="center" width="280" src="./.github/logo-dark.svg#gh-dark-mode-only"/></p>
<p align="center"><img align="center" width="280" src="./.github/logo-light.svg#gh-light-mode-only"/></p>
<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,ts" />
  <br/>
  <a href="https://discord.movie-web.app"><kbd>🔵 discord</kbd></a> <a href="https://movie-web.app"><kbd>🟢 website</kbd></a>
</p>
<br/><br/>

# ⚡What is movie-web?

movie-web is a web app for watching movies easily. Check it out at <a href="https://movie-web.app"><kbd>movie-web.app</kbd></a>.

This service works by displaying video files from third-party providers inside an intuitive and aesthetic user interface.

# 🔥Features

- Automatic saving of progress - optionally synced to an account.
- Bookmark shows or movies, keep track of what you want to watch.
- Minimalistic interface that only shows whats required - no algorithm to consume you.

## 🍄 Philosophy

This project is meant to be simple and easy to use. Keep features minimal but polished.
We do not want this project to be yet another bulky streaming site, instead it aims for minimalism.

On top of that, hosting should be as cheap and simple as possible. Just a static website with a proxy, with an optional backend if you want cross-device syncing.

Content is fetched from third parties and scraping is fully done on the client. This means that the hoster has no files or media on their server. All files are streamed directly from the third parties.

## ⚠️ Limitations

- Due to being a static site, there can be no SSR
- To keep it cheap to host, amount of proxied requests need to be kept to a minimum
- Also to keep it cheap, no content must ever be streamed through the proxy. So only streams not protected by CORS headers.

# 🧬 Running locally for development

To ensure a consistent development environment, we recommend using Node Version Manager (NVM) along with the specified Node.js version. Follow these steps to set up your local environment:

1. **Install NVM:**
   - If you don't have NVM installed, follow the instructions [here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) to install it.

2. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

3. **Use the Recommended Node.js Version:**
   Run the following command to automatically switch to the recommended Node.js version specified in the `.nvmrc` file:
   ```bash
   nvm use
   ```

4. **Install Dependencies and Run Development Server:**
   ```bash
   pnpm install
   pnpm run dev
   ```

5. **Configure Your Environment:**
   Create an `.env` file by using the content of `example.env` as a template. Customize the values according to your needs.

6. **Build Production Files:**
   To build production files, run:
   ```bash
   pnpm build
   ```

> [!TIP]
> Make sure you have pnpm installed (`npm i -g pnpm`) and use Node.js version 20 by following the steps above.


# 🥔 Selfhosting

A simple guide has been written to assist in hosting your own instance of movie-web. Check it out below

|[Selfhosting guide](https://docs.movie-web.app)|
|---|

## 🤝 Thanks to all Contributors
This project would not be possible without our amazing contributors and the community. Thanks a lot! Keep rocking 🍻.

[![Contributors](https://contrib.rocks/image?repo=movie-web/movie-web)](https://github.com/movie-web/movie-web/graphs/contributors)

