namespace STLAF.API.Common;

public class PaginatedResult<T>
{
    public IEnumerable<T> Data { get; set; } = [];

    public int TotalRecords { get; set; }

    public int TotalPages { get; set; }

    public int CurrentPage { get; set; }

    public int PageSize { get; set; }
}