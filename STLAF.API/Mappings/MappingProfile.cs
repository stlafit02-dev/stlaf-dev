using AutoMapper;
using STLAF.API.DTOs.Ticket;
using STLAF.API.DTOs.User;
using STLAF.API.Models;
using STLAF.API.Enums;

namespace STLAF.API.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateTicketDto, Ticket>();
        CreateMap<User, UserDto>();

        CreateMap<Ticket, TicketDto>()
            .ForMember(
                dest => dest.Department,
                opt => opt.MapFrom(src => GetDepartmentName(src.Department)))
            .ForMember(
                dest => dest.AssignedTo,
                opt => opt.MapFrom(src =>
                    src.AssignedUser != null
                        ? $"{src.AssignedUser.FirstName} {src.AssignedUser.LastName}"
                        : null));

        CreateMap<Ticket, PublicTicketDto>()
            .ForMember(
                dest => dest.Department,
                opt => opt.MapFrom(src => GetDepartmentName(src.Department)))
            .ForMember(
                dest => dest.Status,
                opt => opt.MapFrom(src => src.Status.ToString()))
            .ForMember(
                dest => dest.Priority,
                opt => opt.MapFrom(src => src.Priority.ToString()));
    }

    private static string GetDepartmentName(Department department)
    {
        return department switch
        {
            Department.HumanResources => "Human Resource Department",
            Department.Litigation => "Litigation Department",
            Department.Corporate => "Corporate Department",
            Department.Accounting => "Accounting Department",
            Department.Marketing => "Marketing Department",
            Department.IT => "IT Department",
            _ => department.ToString()
        };
    }
}