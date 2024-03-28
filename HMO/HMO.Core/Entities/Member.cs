using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Core.Entities
{

   
    public class Member
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string MemberId { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string Telephone { get; set; }
        public string MobilePhone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public List<Vaccination> Vaccinations { get; set; }
        public string Positive { get; set; }
        public string Recovery { get; set; }
        public int NumOfVaccinations { get; set; }

    }
}
