using AutoMapper;
using HMO.API.Models;
using HMO.Core.Entities;

namespace HMO.API.Mapping
{
    public class APIMappingProfile:Profile
    {
        public APIMappingProfile()
        {
            CreateMap<MemberPostModel, Member>();
            CreateMap<VaccinationPostModel, Vaccination>();
            CreateMap<ManufacturerPostModel, Manufacturer>();
        }
        
    }
}
