using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Core.Entities
{
    public class Vaccination
    {
        public int Id { get; set; }
        public DateTime Getting { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public int ManufacturerId { get; set; }
        public int MemberId { get; set; }
        public Member Member { get; set; }
    }
}
