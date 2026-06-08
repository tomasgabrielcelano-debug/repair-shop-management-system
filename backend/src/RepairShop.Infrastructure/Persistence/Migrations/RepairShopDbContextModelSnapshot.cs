using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

#nullable disable

namespace RepairShop.Infrastructure.Persistence.Migrations;

[DbContext(typeof(RepairShopDbContext))]
public partial class RepairShopDbContextModelSnapshot : ModelSnapshot
{
    protected override void BuildModel(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasAnnotation("ProductVersion", "8.0.0")
            .HasAnnotation("Relational:MaxIdentifierLength", 63);

        modelBuilder.Entity("RepairShop.Domain.Shops.Shop", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<string>("Name")
                .IsRequired()
                .HasMaxLength(120)
                .HasColumnType("character varying(120)");

            b.Property<string>("Phone")
                .HasMaxLength(40)
                .HasColumnType("character varying(40)");

            b.Property<string>("AddressLine")
                .HasMaxLength(200)
                .HasColumnType("character varying(200)");

            b.Property<string>("City")
                .HasMaxLength(80)
                .HasColumnType("character varying(80)");

            b.Property<string>("Country")
                .HasMaxLength(80)
                .HasColumnType("character varying(80)");

            b.Property<bool>("IsActive")
                .HasColumnType("boolean");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.Property<DateTime>("UpdatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("Name")
                .HasDatabaseName("IX_shops_Name");

            b.ToTable("shops");
        });

        modelBuilder.Entity("RepairShop.Domain.Users.AppUser", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<string>("Email")
                .IsRequired()
                .HasMaxLength(180)
                .HasColumnType("character varying(180)");

            b.Property<string>("DisplayName")
                .IsRequired()
                .HasMaxLength(120)
                .HasColumnType("character varying(120)");

            b.Property<int>("Role")
                .HasColumnType("integer");

            b.Property<string>("PasswordHash")
                .IsRequired()
                .HasMaxLength(400)
                .HasColumnType("character varying(400)");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("Email")
                .IsUnique()
                .HasDatabaseName("IX_users_Email");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_users_ShopId");

            b.ToTable("users");
        });

        modelBuilder.Entity("RepairShop.Domain.Customers.Customer", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<string>("FullName")
                .IsRequired()
                .HasMaxLength(120)
                .HasColumnType("character varying(120)");

            b.Property<string>("Phone")
                .IsRequired()
                .HasMaxLength(40)
                .HasColumnType("character varying(40)");

            b.Property<string>("Notes")
                .HasMaxLength(500)
                .HasColumnType("character varying(500)");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_customers_ShopId");

            b.HasIndex("ShopId", "Phone")
                .HasDatabaseName("IX_customers_ShopId_Phone");

            b.ToTable("customers");
        });

        modelBuilder.Entity("RepairShop.Domain.Devices.Device", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<Guid>("CustomerId")
                .HasColumnType("uuid");

            b.Property<string>("Brand")
                .IsRequired()
                .HasMaxLength(60)
                .HasColumnType("character varying(60)");

            b.Property<string>("Model")
                .IsRequired()
                .HasMaxLength(60)
                .HasColumnType("character varying(60)");

            b.Property<string>("Label")
                .HasMaxLength(120)
                .HasColumnType("character varying(120)");

            b.Property<string>("SerialNumber")
                .HasMaxLength(80)
                .HasColumnType("character varying(80)");

            b.Property<string>("Notes")
                .HasMaxLength(500)
                .HasColumnType("character varying(500)");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_devices_ShopId");

            b.HasIndex("ShopId", "CustomerId")
                .HasDatabaseName("IX_devices_ShopId_CustomerId");

            b.ToTable("devices");
        });

        modelBuilder.Entity("RepairShop.Domain.RepairOrders.RepairOrder", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<Guid>("CustomerId")
                .HasColumnType("uuid");

            b.Property<Guid>("DeviceId")
                .HasColumnType("uuid");

            b.Property<string>("IssueDescription")
                .IsRequired()
                .HasMaxLength(500)
                .HasColumnType("character varying(500)");

            b.Property<string>("Notes")
                .HasMaxLength(800)
                .HasColumnType("character varying(800)");

            b.Property<int>("Status")
                .HasColumnType("integer");

            b.Property<decimal>("QuoteAmount")
                .HasColumnType("numeric(18,2)");

            b.Property<string>("QuoteCurrency")
                .HasMaxLength(8)
                .HasColumnType("character varying(8)");

            b.Property<Guid>("QuoteUpdatedByUserId")
                .HasColumnType("uuid");

            b.Property<DateTime>("QuoteUpdatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.Property<DateTime>("UpdatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_repair_orders_ShopId");

            b.HasIndex("ShopId", "CustomerId")
                .HasDatabaseName("IX_repair_orders_ShopId_CustomerId");

            b.HasIndex("ShopId", "DeviceId")
                .HasDatabaseName("IX_repair_orders_ShopId_DeviceId");

            b.HasIndex("ShopId", "Status")
                .HasDatabaseName("IX_repair_orders_ShopId_Status");

            b.ToTable("repair_orders");
        });

        modelBuilder.Entity("RepairShop.Domain.RepairOrders.RepairOrderStatusHistory", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<Guid>("RepairOrderId")
                .HasColumnType("uuid");

            b.Property<int>("FromStatus")
                .HasColumnType("integer");

            b.Property<int>("ToStatus")
                .HasColumnType("integer");

            b.Property<Guid>("ChangedByUserId")
                .HasColumnType("uuid");

            b.Property<DateTime>("ChangedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_order_status_history_ShopId");

            b.HasIndex("ShopId", "RepairOrderId")
                .HasDatabaseName("IX_order_status_history_ShopId_RepairOrderId");

            b.ToTable("order_status_history");
        });

        modelBuilder.Entity("RepairShop.Domain.RepairOrders.RepairOrderNote", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<Guid>("RepairOrderId")
                .HasColumnType("uuid");

            b.Property<string>("Body")
                .IsRequired()
                .HasMaxLength(1200)
                .HasColumnType("character varying(1200)");

            b.Property<Guid>("CreatedByUserId")
                .HasColumnType("uuid");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_order_notes_ShopId");

            b.HasIndex("ShopId", "RepairOrderId")
                .HasDatabaseName("IX_order_notes_ShopId_RepairOrderId");

            b.ToTable("order_notes");
        });

        modelBuilder.Entity("RepairShop.Domain.RepairOrders.RepairOrderAttachment", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<Guid>("RepairOrderId")
                .HasColumnType("uuid");

            b.Property<string>("Url")
                .IsRequired()
                .HasMaxLength(800)
                .HasColumnType("character varying(800)");

            b.Property<string>("Label")
                .HasMaxLength(120)
                .HasColumnType("character varying(120)");

            b.Property<Guid>("CreatedByUserId")
                .HasColumnType("uuid");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_order_attachments_ShopId");

            b.HasIndex("ShopId", "RepairOrderId")
                .HasDatabaseName("IX_order_attachments_ShopId_RepairOrderId");

            b.ToTable("order_attachments");
        });

        modelBuilder.Entity("RepairShop.Domain.RepairOrders.RepairOrderPayment", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<Guid>("RepairOrderId")
                .HasColumnType("uuid");

            b.Property<decimal>("Amount")
                .HasColumnType("numeric(18,2)");

            b.Property<string>("Currency")
                .IsRequired()
                .HasMaxLength(8)
                .HasColumnType("character varying(8)");

            b.Property<int>("Method")
                .HasColumnType("integer");

            b.Property<string>("Reference")
                .HasMaxLength(120)
                .HasColumnType("character varying(120)");

            b.Property<Guid>("CreatedByUserId")
                .HasColumnType("uuid");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_order_payments_ShopId");

            b.HasIndex("ShopId", "RepairOrderId")
                .HasDatabaseName("IX_order_payments_ShopId_RepairOrderId");

            b.ToTable("order_payments");
        });

        modelBuilder.Entity("RepairShop.Domain.RepairOrders.RepairOrderReceptionChecklist", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<Guid>("RepairOrderId")
                .HasColumnType("uuid");

            b.Property<bool>("ScreenOk")
                .HasColumnType("boolean");

            b.Property<bool>("CamerasOk")
                .HasColumnType("boolean");

            b.Property<bool>("SpeakersOk")
                .HasColumnType("boolean");

            b.Property<bool>("MicrophoneOk")
                .HasColumnType("boolean");

            b.Property<bool>("ButtonsOk")
                .HasColumnType("boolean");

            b.Property<bool>("FaceIdOk")
                .HasColumnType("boolean");

            b.Property<bool>("FingerprintOk")
                .HasColumnType("boolean");

            b.Property<int>("CloudLock")
                .HasColumnType("integer");

            b.Property<int>("BatteryPercent")
                .HasColumnType("integer");

            b.Property<string>("CosmeticNotes")
                .HasMaxLength(500)
                .HasColumnType("character varying(500)");

            b.Property<Guid>("UpdatedByUserId")
                .HasColumnType("uuid");

            b.Property<DateTime>("UpdatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId", "RepairOrderId")
                .IsUnique()
                .HasDatabaseName("IX_order_reception_checklists_ShopId_RepairOrderId");

            b.ToTable("order_reception_checklists");
        });

        modelBuilder.Entity("RepairShop.Domain.Messaging.MessageTemplate", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<string>("Key")
                .IsRequired()
                .HasMaxLength(120)
                .HasColumnType("character varying(120)");

            b.Property<string>("Title")
                .IsRequired()
                .HasMaxLength(120)
                .HasColumnType("character varying(120)");

            b.Property<string>("Body")
                .IsRequired()
                .HasMaxLength(4000)
                .HasColumnType("character varying(4000)");

            b.Property<bool>("IsActive")
                .HasColumnType("boolean");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.Property<DateTime>("UpdatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_message_templates_ShopId");

            b.HasIndex("ShopId", "Key")
                .IsUnique()
                .HasDatabaseName("IX_message_templates_ShopId_Key");

            b.ToTable("message_templates");
        });

        modelBuilder.Entity("RepairShop.Domain.Auditing.AuditEvent", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<string>("EntityType")
                .IsRequired()
                .HasMaxLength(80)
                .HasColumnType("character varying(80)");

            b.Property<Guid>("EntityId")
                .HasColumnType("uuid");

            b.Property<string>("Action")
                .IsRequired()
                .HasMaxLength(120)
                .HasColumnType("character varying(120)");

            b.Property<Guid>("ActorUserId")
                .HasColumnType("uuid");

            b.Property<string>("ActorEmail")
                .HasMaxLength(180)
                .HasColumnType("character varying(180)");

            b.Property<string>("DataJson")
                .HasMaxLength(4000)
                .HasColumnType("character varying(4000)");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_audit_events_ShopId");

            b.HasIndex("ShopId", "EntityType", "EntityId", "CreatedAtUtc")
                .HasDatabaseName("IX_audit_events_ShopId_EntityType_EntityId_CreatedAtUtc");

            b.ToTable("audit_events");
        });

        modelBuilder.Entity("RepairShop.Domain.Notifications.NotificationOutboxItem", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<int>("Channel")
                .HasColumnType("integer");

            b.Property<string>("Recipient")
                .IsRequired()
                .HasMaxLength(80)
                .HasColumnType("character varying(80)");

            b.Property<string>("Title")
                .HasMaxLength(120)
                .HasColumnType("character varying(120)");

            b.Property<string>("Body")
                .IsRequired()
                .HasMaxLength(4000)
                .HasColumnType("character varying(4000)");

            b.Property<int>("Status")
                .HasColumnType("integer");

            b.Property<int>("AttemptCount")
                .HasColumnType("integer");

            b.Property<DateTime>("NextAttemptAtUtc")
                .HasColumnType("timestamp with time zone");

            b.Property<string>("LastError")
                .HasMaxLength(4000)
                .HasColumnType("character varying(4000)");

            b.Property<string>("CorrelationKey")
                .HasMaxLength(200)
                .HasColumnType("character varying(200)");

            b.Property<string>("RelatedEntityType")
                .HasMaxLength(80)
                .HasColumnType("character varying(80)");

            b.Property<Guid>("RelatedEntityId")
                .HasColumnType("uuid");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.Property<DateTime>("UpdatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_notification_outbox_ShopId");

            b.HasIndex("ShopId", "Status", "CreatedAtUtc")
                .HasDatabaseName("IX_notification_outbox_ShopId_Status_CreatedAtUtc");

            b.HasIndex("ShopId", "CorrelationKey")
                .IsUnique()
                .HasDatabaseName("IX_notification_outbox_ShopId_CorrelationKey");

            b.ToTable("notification_outbox");
        });

        modelBuilder.Entity("RepairShop.Domain.Inventory.InventoryItem", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<string>("Sku")
                .IsRequired()
                .HasMaxLength(60)
                .HasColumnType("character varying(60)");

            b.Property<string>("Name")
                .IsRequired()
                .HasMaxLength(160)
                .HasColumnType("character varying(160)");

            b.Property<int>("QuantityOnHand")
                .HasColumnType("integer");

            b.Property<decimal>("UnitCost")
                .HasColumnType("numeric(18,2)");

            b.Property<string>("UnitCostCurrency")
                .HasMaxLength(8)
                .HasColumnType("character varying(8)");

            b.Property<bool>("IsActive")
                .HasColumnType("boolean");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.Property<DateTime>("UpdatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_inventory_items_ShopId");

            b.HasIndex("ShopId", "Sku")
                .IsUnique()
                .HasDatabaseName("IX_inventory_items_ShopId_Sku");

            b.ToTable("inventory_items");
        });

        modelBuilder.Entity("RepairShop.Domain.Inventory.InventoryAdjustment", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<Guid>("InventoryItemId")
                .HasColumnType("uuid");

            b.Property<int>("Type")
                .HasColumnType("integer");

            b.Property<int>("DeltaQuantity")
                .HasColumnType("integer");

            b.Property<string>("Reason")
                .HasMaxLength(300)
                .HasColumnType("character varying(300)");

            b.Property<Guid>("RepairOrderId")
                .HasColumnType("uuid");

            b.Property<Guid>("CreatedByUserId")
                .HasColumnType("uuid");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_inventory_adjustments_ShopId");

            b.HasIndex("ShopId", "InventoryItemId")
                .HasDatabaseName("IX_inventory_adjustments_ShopId_InventoryItemId");

            b.ToTable("inventory_adjustments");
        });

        modelBuilder.Entity("RepairShop.Domain.Inventory.RepairOrderPartUsage", b =>
        {
            b.Property<Guid>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("uuid");

            b.Property<Guid>("ShopId")
                .HasColumnType("uuid");

            b.Property<Guid>("RepairOrderId")
                .HasColumnType("uuid");

            b.Property<Guid>("InventoryItemId")
                .HasColumnType("uuid");

            b.Property<int>("QuantityUsed")
                .HasColumnType("integer");

            b.Property<decimal>("UnitPrice")
                .HasColumnType("numeric(18,2)");

            b.Property<string>("UnitPriceCurrency")
                .HasMaxLength(8)
                .HasColumnType("character varying(8)");

            b.Property<Guid>("CreatedByUserId")
                .HasColumnType("uuid");

            b.Property<DateTime>("CreatedAtUtc")
                .HasColumnType("timestamp with time zone");

            b.HasKey("Id");

            b.HasIndex("ShopId")
                .HasDatabaseName("IX_order_part_usage_ShopId");

            b.HasIndex("ShopId", "RepairOrderId")
                .HasDatabaseName("IX_order_part_usage_ShopId_RepairOrderId");

            b.HasIndex("ShopId", "InventoryItemId")
                .HasDatabaseName("IX_order_part_usage_ShopId_InventoryItemId");

            b.ToTable("order_part_usage");
        });
    }
}
