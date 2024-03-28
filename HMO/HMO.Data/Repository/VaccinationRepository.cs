using HMO.Core.Entities;
using HMO.Core.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Data.Repository
{
    public class VaccinationRepository:IVaccinationRepository
    {
        private readonly DataContext _dataContext;
        public VaccinationRepository(DataContext context)
        {
            _dataContext = context;
        }
        public async Task<IEnumerable<Vaccination>> GetAsync()
        {
            return await _dataContext.Vaccinations.Include(m=>m.Manufacturer).ToListAsync();
        }

        public async Task<Vaccination> GetAsync(int id)
        {
            return await _dataContext.Vaccinations
                .Include(v => v.Manufacturer)
                .FirstOrDefaultAsync(v => v.Id == id);
        }
        public async Task<Vaccination> PostAsync(Vaccination v)
        {
            _dataContext.Vaccinations.Add(v);
            await _dataContext.SaveChangesAsync();
            return v;
        }
        public async Task PutAsync(int id, Vaccination v)
        {
            var vaccination = _dataContext.Vaccinations.Find(id);
            vaccination.Getting = v.Getting;
            vaccination.Manufacturer = v.Manufacturer;
            
            await _dataContext.SaveChangesAsync();

        }
        public async Task DeleteAsync(int id)
        {
            var vaccination = _dataContext.Vaccinations.Find(id);
            _dataContext.Vaccinations.Remove(vaccination);
            await _dataContext.SaveChangesAsync();
        }
    }
}
