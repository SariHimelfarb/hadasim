using HMO.Core.Entities;
using HMO.Core.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Data.Repository
{
    public class MemberRepository:IMemberRepository
    {
        private readonly DataContext _dataContext;
        public MemberRepository(DataContext context)
        {
            _dataContext = context;
        }
        public async Task<IEnumerable<Member>> GetAsync()
        {
            return await _dataContext.Members
                .Include(m => m.Vaccinations)
                .ThenInclude(v => v.Manufacturer) 
                .ToListAsync();
        }

        public async Task<Member> GetAsync(int id)
        {
            return await _dataContext.Members
                .Include(m => m.Vaccinations)
                    .ThenInclude(v => v.Manufacturer)
                .FirstOrDefaultAsync(m => m.Id == id);
        }
        public async Task<Member> PostAsync(Member m)
        {
            _dataContext.Members.Add(m);
            await _dataContext.SaveChangesAsync();
            return m;
        }
        public async Task PutAsync(int id, Member m)
        {
            var member = _dataContext.Members.Find(id);
            member.Name = m.Name;
            member.Street = m.Street;
            member.City = m.City;
            member.Number = m.Number;
            member.Positive=m.Positive;
            member.Recovery = m.Recovery;
            member.DateOfBirth = m.DateOfBirth;
            member.Vaccinations=m.Vaccinations;
            member.MemberId= m.MemberId;
            member.MobilePhone = m.MobilePhone;
            member.Telephone=m.Telephone;
            member.NumOfVaccinations= m.NumOfVaccinations;

            await _dataContext.SaveChangesAsync();

        }
        public async Task DeleteAsync(int id)
        {
            var member = _dataContext.Members.Find(id);
            _dataContext.Members.Remove(member);
            await _dataContext.SaveChangesAsync();
        }



    }
}
