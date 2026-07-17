using AutoMapper;
using STLAF.API.DTOs.Asset;
using STLAF.API.DTOs.Ticket;
using STLAF.API.DTOs.User;
using STLAF.API.Models;

namespace STLAF.API.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Ticket
        CreateMap<CreateTicketDto, Ticket>();

        CreateMap<Ticket, TicketDto>()
        .ForMember(
            dest => dest.AssignedToId,
            opt => opt.MapFrom(src => src.AssignedTo)
        )
        .ForMember(
            dest => dest.AssignedTo,
            opt => opt.MapFrom(src =>
                src.AssignedUser != null
                    ? $"{src.AssignedUser.FirstName} {src.AssignedUser.LastName}"
                    : null
            ));

        // Asset
        CreateMap<CreateAssetDto, Asset>();

        CreateMap<Asset, AssetDto>()
            .ForMember(
                dest => dest.AssignedTo,
                opt => opt.MapFrom(src =>
                    src.AssignedUser != null
                        ? $"{src.AssignedUser.FirstName} {src.AssignedUser.LastName}"
                        : null));

        // User
        CreateMap<User, UserDto>();
        CreateMap<TicketComment, TicketCommentDto>();
        CreateMap<CreateCommentDto, TicketComment>();
        //TicketHistory
        CreateMap<TicketHistory, TicketHistoryDto>()
            .ForMember(
                dest => dest.PerformedBy,
                opt => opt.MapFrom(src =>
                    src.User != null
                        ? $"{src.User.FirstName} {src.User.LastName}"
                        : "System"));
    }


}