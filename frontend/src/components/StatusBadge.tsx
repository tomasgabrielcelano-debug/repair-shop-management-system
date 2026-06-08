import { RepairOrderStatus } from '../api/types'
import { Badge } from './ui/Badge'

export function statusLabel(status: string) {
  // backend returns string enum name
  return status
}

export function statusNumberFromKey(key: keyof typeof RepairOrderStatus) {
  return RepairOrderStatus[key]
}

export default function StatusBadge({ status }: { status: string }) {
  const variant =
    status === 'Ready'
      ? 'success'
      : status === 'Delivered'
        ? 'default'
        : status === 'Cancelled'
          ? 'danger'
          : 'warning'

  return <Badge variant={variant as any}>{statusLabel(status)}</Badge>
}
