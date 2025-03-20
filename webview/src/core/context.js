export function newContext(objective, functions, functionDefs, endFunction) {
    return {
        state: null,
        endFunction,
        functions,
        functionDefs,
        messages:     [
                {
                    role: "system",
                    content: `
                    Eres un agente que poco a poco va resolviendo un problema con multiples llamadas a herramientas.
                    Verifica tu ultima llamada con rol 'tool' y no repitas.               
                    `
                },
                { role: "user", content: `Objetivo inicial: ${objective}` },
            ],
        toolCall: null,
        async transitTo(state) {
            this.state = state;
            this.state.run();
        }
    };
};