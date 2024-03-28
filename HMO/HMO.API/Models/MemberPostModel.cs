using HMO.Core.Entities;

namespace HMO.API.Models
{
    public class MemberPostModel
    {
        public string Name { get; set; }
        public string MemberId { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string Telephone { get; set; }
        public string MobilePhone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Positive { get; set; }
        public string Recovery { get; set; }

    }
}
