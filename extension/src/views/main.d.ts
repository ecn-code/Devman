import * as vscode from "vscode";
export declare class MainViewProvider implements vscode.WebviewViewProvider {
    private readonly _extensionPath;
    private readonly _extensionUri;
    static readonly viewType = "sveltecode.mainView";
    private static _view?;
    constructor(_extensionPath: string, _extensionUri: vscode.Uri);
    resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext<unknown>, token: vscode.CancellationToken): void | Thenable<void>;
    getWebviewHTML(webview: vscode.Webview): string;
}
