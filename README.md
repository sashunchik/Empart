# 🧭 Empart

**Empart** is an aesthetic emotional journal that turns your feelings into AI-generated art, sound, and words.  
Reflect, observe, preserve, and (optionally) share — in a space that values your inner experience.

---

## 🌟 Features

- 🧠 **AI-powered emotional analysis** (via text, voice, or mood palette)
- 🎨 **Visual landscape generation** based on emotional state (DALL·E / Stable Diffusion)
- 🎵 **Ambient sound or AI music** generation
- 📓 **Empart viewer** with journaling, tagging, and saving
- 💎 **NFT minting** of your emotional states as unique memory artifacts
- 🫂 **DAO feed** of shared emotional states from other users
- 📅 **Emotional calendar or world map** for self-reflection over time

---

## 🧭 User Journey

1. You wake up, open Empart
2. Enter a few thoughts, select your mood, or speak it aloud
3. AI analyzes and adds emotional tags + poetic summary
4. A visual metaphor is generated: your Empart
5. You view it, save it, journal it, or share it
6. Your profile builds a personal map of your emotional evolution

---

## 🛠️ Tech Stack

| Area                 | Tech                                       |
|----------------------|---------------------------------------------|
| Frontend             | React, TailwindCSS                          |
| Backend              | ICP canister           |
| AI Integration       | OpenAI GPT, DALL·E / Stable Diffusion       |
| Sound Generation     | Web Audio API, AI music tools               |
| Web3 & NFTs          | ICP, NFT.storage, Stoic Identity            |
| DAO / Community Feed | Canister-based DAO / SNS                    |
| Decentralized Storage| IPFS for generated images & data            |

---

## 📸 Example Empart

| Emotions | Generated Visual |
|----------|------------------|
| Tired + Hopeful | _A flooded library in dawn mist_ |
| Anxious + Anticipating | _A desert with light on the horizon_ |
| Calm | _A forest under translucent skies with morning fog_ |

---

## 📄 License

### 🔹 Code
All code in this repository is licensed under the [MIT License](./LICENSE).

### 🔹 Generated Content
All AI-generated or user-submitted content (images, text, music) is licensed under:

**Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**  
📄 https://creativecommons.org/licenses/by-nc/4.0/

> You are free to use, remix, and adapt the content non-commercially, with proper attribution.


# Hello, world!

"Hello, world!" projects are a common starting point for developers learning new languages or platforms, as it provides a simple demonstration of how a programming language can be written for an application.

This application's logic is written in [Motoko](https://internetcomputer.org/docs/motoko/main/getting-started/motoko-introduction), a programming language designed specifically for developing canisters on ICP.

## Deploying from ICP Ninja

When viewing this project in ICP Ninja, you can deploy it directly to the mainnet for free by clicking "Run" in the upper right corner. Open this project in ICP Ninja:

[![](https://icp.ninja/assets/open.svg)](https://icp.ninja/i?g=https://github.com/sashunchik/Untitled-fullstack)

## Project structure

The `/backend` folder contains the Motoko canister, `app.mo`. The `/frontend` folder contains web assets for the application's user interface. The user interface is written with plain JavaScript, but any frontend framework can be used.

Edit the `mops.toml` file to add [Motoko dependencies](https://mops.one/) to the project.

## Build and deploy from the command-line

To migrate your ICP Ninja project off of the web browser and develop it locally, follow these steps. These steps are necessary if you want to deploy this project for long-term, production use on the mainnet.

### 1. Download your project from ICP Ninja using the 'Download files' button on the upper left corner under the pink ninja star icon.

### 2. Open the `BUILD.md` file for further instructions.
