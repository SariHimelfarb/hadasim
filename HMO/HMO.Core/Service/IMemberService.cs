using HMO.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Core.Service
{
    public interface IMemberService
    {
        public Task<IEnumerable<Member>> GetAsync();
        public Task<Member> GetAsync(int id);
        public Task<Member> PostAsync(Member m);
        public Task PutAsync(int id, Member m);
        public Task DeleteAsync(int id);


    }
}
