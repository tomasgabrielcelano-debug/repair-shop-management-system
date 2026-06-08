import React, { useEffect, useRef } from 'react'

export default function Modal({
  open,
  title,
  onClose,
  children,
  footer
}: {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  const ref = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return
    if (open && !dlg.open) dlg.showModal()
    if (!open && dlg.open) dlg.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
    >
      <div className="dialogHeader">
        <strong>{title}</strong>
        <button className="btn" onClick={onClose}>Cerrar</button>
      </div>
      <div className="dialogBody">{children}</div>
      {footer ? <div className="dialogFooter">{footer}</div> : null}
    </dialog>
  )
}
