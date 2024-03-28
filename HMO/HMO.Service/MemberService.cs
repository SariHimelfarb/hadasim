using HMO.Core.Entities;
using HMO.Core.Repository;
using HMO.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Service
{
    public class MemberService:IMemberService
    {
        private readonly IMemberRepository _memberRepository;
        public MemberService(IMemberRepository context1)
        {
            _memberRepository = context1;
        }
        public Task<IEnumerable<Member>> GetAsync()
        {
            return _memberRepository.GetAsync();
        }

        public Task<Member> GetAsync(int id)
        {
            return _memberRepository.GetAsync(id);
        }

        public async Task<Member> PostAsync(Member m)
        {
            return await _memberRepository.PostAsync(m);
        }

        public async Task PutAsync(int id, Member m)
        {
            await _memberRepository.PutAsync(id, m);
        }

        public async Task DeleteAsync(int id)
        {
            await _memberRepository.DeleteAsync(id);
        }



    }
}
