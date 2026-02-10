# 🚀 Ollama Autocomplete

A lightweight, local AI-powered code completion extension for VS Code. This extension leverages **Ollama** and high-performance models like `Qwen2.5-Coder` to provide intelligent code suggestions right in your editor—100% offline and private.

## ✨ Features

- **Smart Auto-Suggest:** Get code completions as you type with configurable debounce timing.
- **Manual Trigger:** Force a suggestion anytime using `Alt + /`.
- **FIM Technology:** Uses *Fill-In-the-Middle* logic to understand both the code before and after your cursor for stunning accuracy.
- **Status Bar Integration:** Real-time visual feedback (Thinking, Ready, or Error) directly in the VS Code status bar.
- **Privacy First:** Your code never leaves your machine. All processing is done locally via Ollama.
- **Fully Customizable:** Change models, API endpoints, and typing delay via settings.

## 🛠 Prerequisites

1. Install [Ollama](https://ollama.com/) on your machine.
2. Download your preferred coding model (Recommended: `qwen2.5-coder:1.5b` for speed or `7b` for better logic):
```bash
ollama run qwen2.5-coder:1.5b
```

## ⌨️ Keyboard Shortcuts

| Action | Windows/Linux | macOS |
| :--- | :--- | :--- |
| Trigger Suggestion | `Alt + /` | `Option + /` |

## ⚙️ Configuration

You can customize the extension via VS Code Settings (`Ctrl + ,`). Search for **Ollama**:

- `ollama.model`: The name of the model installed in Ollama (default: `qwen2.5-coder:1.5b`).
- `ollama.apiBaseUrl`: Your Ollama server URI (default: `http://localhost:11434`).
- `ollama.autoSuggest`: Enable or disable automatic suggestions while typing.
- `ollama.debounceTime`: Delay in milliseconds after the last keystroke before calling the AI (default: `1000`).

## 🚀 Installation

1. Download the provided `.vsix` file.
2. Open VS Code and go to the **Extensions** view (`Ctrl+Shift+X`).
3. Click the "three dots" menu (`...`) at the top right.
4. Select **Install from VSIX...** and choose the file.

## 📝 License

This project is licensed under the MIT License.

---
Built with ❤️ for the developer community.