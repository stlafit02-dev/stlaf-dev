using STLAF.API.Enums;

namespace STLAF.API.DTOs.Asset;

public class UpdateAssetDto
{
    public AssetStatus Status { get; set; }

    public Guid? AssignedTo { get; set; }

    public string Department { get; set; } = string.Empty;
}