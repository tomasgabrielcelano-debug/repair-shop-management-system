export default function Alert({ kind = 'error', text }: { kind?: 'error' | 'info'; text: string }) {
  const cls = kind === 'error' ? 'alert error' : 'alert info'
  return <div className={cls}>{text}</div>
}
