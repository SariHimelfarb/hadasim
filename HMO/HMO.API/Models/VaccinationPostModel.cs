using HMO.Core.Entities;

namespace HMO.API.Models
{
    public class VaccinationPostModel
    {
        public int ManufacturerId { get; set; }
        public DateTime Getting { get; set; }
        public int MemberId { get; set; }
    }
}
