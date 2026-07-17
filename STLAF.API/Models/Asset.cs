using STLAF.API.Enums;

namespace STLAF.API.Models;

public class Asset
{
    public Guid AssetId { get; set; }

    public string AssetName { get; set; } = string.Empty;

    public AssetType Type { get; set; }

    public string BrandModel { get; set; } = string.Empty;

    public string SerialNumber { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public AssetStatus Status { get; set; } = AssetStatus.Available;

    public Guid? AssignedTo { get; set; }

    public User? AssignedUser { get; set; }

    public string Department { get; set; } = string.Empty;

    public string QR { get; set; } = string.Empty;

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
}