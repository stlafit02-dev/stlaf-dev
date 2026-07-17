using STLAF.API.Enums;

namespace STLAF.API.DTOs.Asset;

public class CreateAssetDto
{
    public string AssetName { get; set; } = string.Empty;

    public AssetType Type { get; set; }

    public string BrandModel { get; set; } = string.Empty;

    public string SerialNumber { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public string Department { get; set; } = string.Empty;
}