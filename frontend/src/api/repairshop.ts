import { del, get, post, put } from './client'
import type {
  AuditEventResponse,
  ChangeOrderStatusRequest,
  ChangeOrderStatusResponse,
  CreateInventoryAdjustmentRequest,
  CreateInventoryItemRequest,
  CreateMessageTemplateRequest,
  CreateRepairOrderAttachmentRequest,
  CreateRepairOrderNoteRequest,
  CreateRepairOrderPaymentRequest,
  CustomerCreateRequest,
  CustomerResponse,
  CustomerUpdateRequest,
  DashboardSummaryResponse,
  DeviceCreateRequest,
  DeviceResponse,
  DeviceUpdateRequest,
  InventoryAdjustmentResponse,
  InventoryItemResponse,
  MessagePreviewResponse,
  MessageTemplateResponse,
  RenderOrderMessageRequest,
  RepairOrderAttachmentResponse,
  RepairOrderChecklistResponse,
  RepairOrderCreateRequest,
  RepairOrderNoteResponse,
  RepairOrderPaymentResponse,
  RepairOrderPartUsageResponse,
  RepairOrderResponse,
  RepairOrderUpdateRequest,
  SetOrderQuoteRequest,
  UpdateInventoryItemRequest,
  UpdateMessageTemplateRequest,
  UpdateRepairOrderChecklistRequest,
  UsePartOnOrderRequest,
  OrderStatusHistoryResponse
} from './types'

// --- Dashboard
export const dashboardApi = {
  summary: () => get<DashboardSummaryResponse>('/dashboard/summary')
}

// --- Customers
export const customersApi = {
  list: (params?: { skip?: number; take?: number }) => get<CustomerResponse[]>('/customers', params),
  get: (id: string) => get<CustomerResponse>(`/customers/${id}`),
  create: (body: CustomerCreateRequest) => post<CustomerResponse>('/customers', body),
  update: (id: string, body: CustomerUpdateRequest) => put<CustomerResponse>(`/customers/${id}`, body),
  remove: (id: string) => del(`/customers/${id}`)
}

// --- Devices
export const devicesApi = {
  listByCustomer: (customerId: string, params?: { skip?: number; take?: number }) =>
    get<DeviceResponse[]>(`/devices/by-customer/${customerId}`, params),
  get: (id: string) => get<DeviceResponse>(`/devices/${id}`),
  create: (body: DeviceCreateRequest) => post<DeviceResponse>('/devices', body),
  update: (id: string, body: DeviceUpdateRequest) => put<DeviceResponse>(`/devices/${id}`, body),
  remove: (id: string) => del(`/devices/${id}`)
}

// --- Orders
export const ordersApi = {
  list: (params?: { skip?: number; take?: number }) => get<RepairOrderResponse[]>('/orders', params),
  get: (id: string) => get<RepairOrderResponse>(`/orders/${id}`),
  create: (body: RepairOrderCreateRequest) => post<RepairOrderResponse>('/orders', body),
  update: (id: string, body: RepairOrderUpdateRequest) => put<RepairOrderResponse>(`/orders/${id}`, body),
  remove: (id: string) => del(`/orders/${id}`),

  changeStatus: (id: string, body: ChangeOrderStatusRequest) =>
    post<ChangeOrderStatusResponse>(`/orders/${id}/status`, body),
  history: (id: string) => get<OrderStatusHistoryResponse[]>(`/orders/${id}/history`),

  notes: (id: string) => get<RepairOrderNoteResponse[]>(`/orders/${id}/notes`),
  addNote: (id: string, body: CreateRepairOrderNoteRequest) =>
    post<RepairOrderNoteResponse>(`/orders/${id}/notes`, body),

  attachments: (id: string) => get<RepairOrderAttachmentResponse[]>(`/orders/${id}/attachments`),
  addAttachment: (id: string, body: CreateRepairOrderAttachmentRequest) =>
    post<RepairOrderAttachmentResponse>(`/orders/${id}/attachments`, body),

  setQuote: (id: string, body: SetOrderQuoteRequest) => put<RepairOrderResponse>(`/orders/${id}/quote`, body),

  payments: (id: string) => get<RepairOrderPaymentResponse[]>(`/orders/${id}/payments`),
  addPayment: (id: string, body: CreateRepairOrderPaymentRequest) =>
    post<RepairOrderPaymentResponse>(`/orders/${id}/payments`, body),

  checklist: (id: string) => get<RepairOrderChecklistResponse>(`/orders/${id}/checklist`),
  updateChecklist: (id: string, body: UpdateRepairOrderChecklistRequest) =>
    put<RepairOrderChecklistResponse>(`/orders/${id}/checklist`, body),

  audit: (id: string) => get<AuditEventResponse[]>(`/orders/${id}/audit`),
  preview: (id: string, body: RenderOrderMessageRequest) =>
    post<MessagePreviewResponse>(`/orders/${id}/preview`, body)
}

// --- Templates
export const templatesApi = {
  list: (params?: { includeInactive?: boolean }) => get<MessageTemplateResponse[]>('/templates', params),
  get: (id: string) => get<MessageTemplateResponse>(`/templates/${id}`),
  getByKey: (key: string) => get<MessageTemplateResponse>(`/templates/by-key/${encodeURIComponent(key)}`),
  create: (body: CreateMessageTemplateRequest) => post<MessageTemplateResponse>('/templates', body),
  update: (id: string, body: UpdateMessageTemplateRequest) => put<MessageTemplateResponse>(`/templates/${id}`, body),
  remove: (id: string) => del(`/templates/${id}`)
}

// --- Inventory
export const inventoryApi = {
  list: (params?: { includeInactive?: boolean; skip?: number; take?: number }) =>
    get<InventoryItemResponse[]>('/inventory', params),
  get: (id: string) => get<InventoryItemResponse>(`/inventory/${id}`),
  create: (body: CreateInventoryItemRequest) => post<InventoryItemResponse>('/inventory', body),
  update: (id: string, body: UpdateInventoryItemRequest) => put<InventoryItemResponse>(`/inventory/${id}`, body),
  adjustments: (id: string, params?: { skip?: number; take?: number }) =>
    get<InventoryAdjustmentResponse[]>(`/inventory/${id}/adjustments`, params),
  addAdjustment: (id: string, body: CreateInventoryAdjustmentRequest) =>
    post<InventoryItemResponse>(`/inventory/${id}/adjustments`, body),
  useOnOrder: (orderId: string, body: UsePartOnOrderRequest) =>
    post<RepairOrderPartUsageResponse>(`/inventory/use-on-order/${orderId}`, body),
  partsByOrder: (orderId: string) =>
    get<RepairOrderPartUsageResponse[]>(`/inventory/parts/by-order/${orderId}`)
}
