using AutoMapper;
using Discount.Core.Entities;
using Discount.Grpc.Protos;

namespace Discount.Application.Mapper;

public class DiscountProfile : Profile
{
    public DiscountProfile()
    {
        CreateMap<Coupon, CouponModel>();
        CreateMap<CouponModel, Coupon>();
        // CreateMap<Coupon, CouponModel>()
        //     .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
        //     .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
        //     .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.ProductName))
        //     .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id)).ReverseMap();
    }
}