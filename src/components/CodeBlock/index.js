export default function CodeBlock({codeId, code}) {
    return (
        <code id={'codeBlock-' + codeId}>{code}</code>
    )
}