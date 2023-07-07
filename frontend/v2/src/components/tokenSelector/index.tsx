"use client"

import { useState } from "react"

function TokenSelector() {
    const [checked, setChecked] = useState(false)

    // TODO: assunto resolvido:
    // 1 - Criar componente Select
    // 2 - Receber options via props, com ícones
    // 3 - utilizar o 'use client'

    return (
        <>
            <button onClick={() => setChecked(!checked)}>Teste</button>
            <div
                data-ui={`${checked && "checked"} active`}
                className="data-checked:underline"
            >
                3
            </div>
        </>
    )
}

export default TokenSelector
