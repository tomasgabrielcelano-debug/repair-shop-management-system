export type ApiResponse<T> = { data: T }

export type ProblemDetails = {
  type?: string
  title?: string
  status?: number
  detail?: string
  instance?: string
  errors?: Record<string, string[]>
}

// --- Auth
export type UserResponse = {
  id: string
  shopId: string
  email: string
  displayName: string
  role: 'Admin' | 'Tech' | string
}

export type LoginRequest = { email: string; password: string }
export type LoginResponse = { accessToken: string; user: UserResponse }

// --- Core entities
export type CustomerResponse = {
  id: string
  shopId: string
  fullName: string
  phone: string
  notes?: string | null
  createdAtUtc: string
  updatedAtUtc: string
}

export type CustomerCreateRequest = {
  fullName: string
  phone: string
  notes?: string | null
}

export type CustomerUpdateRequest = CustomerCreateRequest

export type DeviceResponse = {
  id: string
  shopId: string
  customerId: string
  brand: string
  model: string
  serialNumber?: string | null
  notes?: string | null
  createdAtUtc: string
  updatedAtUtc: string
}

export type DeviceCreateRequest = {
  customerId: string
  brand: string
  model: string
  serialNumber?: string | null
  notes?: string | null
}

export type DeviceUpdateRequest = Omit<DeviceCreateRequest, 'customerId'>

// --- Orders
export const RepairOrderStatus = {
  Received: 0,
  Diagnosing: 1,
  InProgress: 2,
  Ready: 3,
  Delivered: 4,
  Cancelled: 5
} as const

export type RepairOrderResponse = {
  id: string
  shopId: string
  customerId: string
  deviceId: string
  issueDescription: string
  notes?: string | null
  status: string
  quoteAmount?: number | null
  quoteCurrency?: string | null
  quoteUpdatedByUserId?: string | null
  quoteUpdatedAtUtc?: string | null
  createdAtUtc: string
  updatedAtUtc: string
}

export type RepairOrderCreateRequest = {
  customerId: string
  deviceId: string
  issueDescription: string
  notes?: string | null
}

export type RepairOrderUpdateRequest = {
  issueDescription: string
  notes?: string | null
}

export type SetOrderQuoteRequest = {
  amount: number | null
  currency: string | null
}

// NotificationChannel enum in backend: WhatsApp=0, SMS=1, Email=2
export const NotificationChannel = {
  WhatsApp: 0,
  SMS: 1,
  Email: 2
} as const

export type ChangeOrderStatusRequest = {
  status: number
  enqueueOutbox?: boolean
  channel?: number
}

export type ChangeOrderStatusResponse = {
  orderId: string
  fromStatus: number
  toStatus: number
  suggestedMessage: string
  outboxItemId?: string | null
}

export type OrderStatusHistoryResponse = {
  id: string
  fromStatus: number
  toStatus: number
  changedByUserId: string
  changedAtUtc: string
}

export type RepairOrderNoteResponse = {
  id: string
  body: string
  createdByUserId: string
  createdAtUtc: string
}

export type CreateRepairOrderNoteRequest = { body: string }

export type RepairOrderAttachmentResponse = {
  id: string
  url: string
  label?: string | null
  createdByUserId: string
  createdAtUtc: string
}

export type CreateRepairOrderAttachmentRequest = { url: string; label?: string | null }

export const PaymentMethod = {
  Cash: 0,
  Transfer: 1,
  Card: 2,
  Other: 3
} as const

export type CreateRepairOrderPaymentRequest = {
  amount: number
  currency: string
  method: number
  reference?: string | null
}

export type RepairOrderPaymentResponse = {
  id: string
  repairOrderId: string
  amount: number
  currency: string
  method: number
  reference?: string | null
  createdByUserId: string
  createdAtUtc: string
}

export const CloudLockStatus = {
  Unknown: 0,
  Off: 1,
  On: 2
} as const

export type UpdateRepairOrderChecklistRequest = {
  screenOk: boolean
  camerasOk: boolean
  speakersOk: boolean
  microphoneOk: boolean
  buttonsOk: boolean
  faceIdOk: boolean
  fingerprintOk: boolean
  cloudLock: number
  batteryPercent?: number | null
  cosmeticNotes?: string | null
}

export type RepairOrderChecklistResponse = UpdateRepairOrderChecklistRequest & {
  id: string
  repairOrderId: string
  updatedByUserId: string
  updatedAtUtc: string
}

export type AuditEventResponse = {
  id: string
  entityType: string
  entityId: string
  action: string
  actorUserId?: string | null
  actorEmail?: string | null
  dataJson?: string | null
  createdAtUtc: string
}

export type RenderOrderMessageRequest = { templateKey: string }
export type MessagePreviewResponse = { templateKey: string; title: string; body: string }

// --- Templates
export type MessageTemplateResponse = {
  id: string
  shopId: string
  key: string
  title: string
  body: string
  isActive: boolean
  createdAtUtc: string
  updatedAtUtc?: string | null
}

export type CreateMessageTemplateRequest = {
  key: string
  title: string
  body: string
  isActive: boolean
}

export type UpdateMessageTemplateRequest = {
  title: string
  body: string
  isActive: boolean
}

// --- Inventory
export type InventoryItemResponse = {
  id: string
  shopId: string
  sku: string
  name: string
  quantityOnHand: number
  unitCost?: number | null
  unitCostCurrency?: string | null
  isActive: boolean
  createdAtUtc: string
  updatedAtUtc?: string | null
}

export type CreateInventoryItemRequest = {
  sku: string
  name: string
  initialQuantity: number
  unitCost?: number | null
  unitCostCurrency?: string | null
  isActive: boolean
}

export type UpdateInventoryItemRequest = {
  name: string
  isActive: boolean
}

// InventoryAdjustmentType enum: Correction=0, Purchase=1, Consumption=2, Other=3
export const InventoryAdjustmentType = {
  Correction: 0,
  Purchase: 1,
  Consumption: 2,
  Other: 3
} as const

export type InventoryAdjustmentResponse = {
  id: string
  inventoryItemId: string
  type: number
  deltaQuantity: number
  reason: string
  repairOrderId?: string | null
  createdByUserId: string
  createdAtUtc: string
}

export type CreateInventoryAdjustmentRequest = {
  type: number
  deltaQuantity: number
  reason: string
}

export type UsePartOnOrderRequest = {
  inventoryItemId: string
  quantityUsed: number
  unitPrice?: number | null
  unitPriceCurrency?: string | null
}

export type RepairOrderPartUsageResponse = {
  id: string
  repairOrderId: string
  inventoryItemId: string
  quantityUsed: number
  unitPrice?: number | null
  unitPriceCurrency?: string | null
  createdByUserId: string
  createdAtUtc: string
}

// --- Dashboard
export type DashboardSummaryResponse = {
  shopId: string
  totalOrders: number
  openOrders: number
  readyOrders: number
  deliveredOrders: number
  cancelledOrders: number
  totalPaymentsAmount: number
  paymentsCurrency?: string | null
  generatedAtUtc: string
}
