import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "$(hubot) Ollama";
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    let debounceTimer: NodeJS.Timeout | undefined;

    const provider: vscode.InlineCompletionItemProvider = {
        async provideInlineCompletionItems(document, position, context, token) {
            const config = vscode.workspace.getConfiguration('ollama');
            const isAutoSuggest = config.get<boolean>('autoSuggest');
            const debounceTime = config.get<number>('debounceTime') || 1000;

            if (!isAutoSuggest && context.triggerKind === vscode.InlineCompletionTriggerKind.Automatic) {
                return [];
            }

            if (context.triggerKind === vscode.InlineCompletionTriggerKind.Automatic) {
                if (debounceTimer) {
                    clearTimeout(debounceTimer);
                }

                await new Promise(resolve => {
                    debounceTimer = setTimeout(resolve, debounceTime);
                });
            }

            if (token.isCancellationRequested) {
                return [];
            }

            statusBarItem.text = "$(sync~spin) Ollama thinking...";

            try {
                const prefix = document.getText(new vscode.Range(Math.max(0, position.line - 100), 0, position.line, position.character));
                const suffix = document.getText(new vscode.Range(position, document.lineAt(Math.min(document.lineCount - 1, position.line + 50)).range.end));

                const prompt = `<|fim_prefix|>${prefix}<|fim_suffix|>${suffix}<|fim_middle|>`;

                const model = config.get<string>('model') || 'qwen2.5-coder:1.5b';
                const baseUrl = config.get<string>('apiBaseUrl') || 'http://localhost:11434';

                const response = await fetch(`${baseUrl}/api/generate`, {
                    method: 'POST',
                    body: JSON.stringify({
                        model: model,
                        prompt: prompt,
                        stream: false,
                        raw: true,
                        options: {
                            num_predict: 128,
                            temperature: 0,
                            stop: ["<|file_separator|>", "<|fim_prefix|>", "<|fim_suffix|>", "<|fim_middle|>", "```", "\n\n"]
                        }
                    }),
                    signal: AbortSignal.timeout(5000)
                });

                const data: any = await response.json();
                statusBarItem.text = "$(hubot) Ollama";

                if (token.isCancellationRequested || !data.response) {
                    return [];
                }

                const item = new vscode.InlineCompletionItem(data.response);
                item.range = new vscode.Range(position, position);
                return [item];

            } catch (err) {
                statusBarItem.text = "$(error) Ollama Error";
                setTimeout(() => statusBarItem.text = "$(hubot) Ollama", 2000);
                return [];
            }
        }
    };

    context.subscriptions.push(
        vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, provider),
        vscode.commands.registerCommand('ollama-completion.trigger', () => {
            vscode.commands.executeCommand('editor.action.inlineSuggest.trigger');
        })
    );
}