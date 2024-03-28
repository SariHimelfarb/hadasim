using AutoMapper;
using HMO.Core.DTOs;
using HMO.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Core.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Member, MemberDTO>().ReverseMap();
            CreateMap<Vaccination, VaccinationDTO>().ReverseMap();
            CreateMap<Manufacturer, ManufacturerDTO>().ReverseMap();
        }
    }
}
