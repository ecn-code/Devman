"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainViewProvider = void 0;
const vscode = __importStar(require("vscode"));
class MainViewProvider {
    _extensionPath;
    _extensionUri;
    static viewType = "sveltecode.mainView";
    static _view;
    constructor(_extensionPath, _extensionUri) {
        this._extensionPath = _extensionPath;
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, token) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        MainViewProvider._view = webviewView;
        webviewView.webview.html = this.getWebviewHTML(webviewView.webview);
    }
    getWebviewHTML(webview) {
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "dist", "style.css"));
        const svelteUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "dist", "webview.umd.js"));
        return /*html*/ `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <link href="${styleUri}" rel="stylesheet">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Extension WebView</title>
          </head>
          <body>
            <div id="app"></div>
            <script type="module" src="${svelteUri}"></script>
          </body>
        </html>`;
    }
}
exports.MainViewProvider = MainViewProvider;
//# sourceMappingURL=main.js.map