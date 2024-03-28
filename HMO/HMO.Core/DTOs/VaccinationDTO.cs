using HMO.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Core.DTOs
{
    public class VaccinationDTO
    {
        public int Id { get; set; }
        public DateTime Getting { get; set; }
        public Manufacturer Manufacturer { get; set; }
        
    }
}
