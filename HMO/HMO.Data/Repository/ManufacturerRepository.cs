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
    public class ManufacturerRepository: IManufacturerRepository
    {
        private readonly DataContext _dataContext;
        public ManufacturerRepository(DataContext context)
        {
            _dataContext = context;
        }
        public async Task<IEnumerable<Manufacturer>> GetAsync()
        {
            return await _dataContext.Manufacturers.ToListAsync();
        }

        public async Task<Manufacturer> GetAsync(int id)
        {
            return await _dataContext.Manufacturers.FindAsync(id); 
        }
        public async Task<Manufacturer> PostAsync(Manufacturer m)
        {
            _dataContext.Manufacturers.Add(m);
            await _dataContext.SaveChangesAsync();
            return m;
        }
        public async Task PutAsync(int id, Manufacturer m)
        {
            var manufacturer = _dataContext.Manufacturers.Find(id);
            manufacturer.Name = m.Name;
            await _dataContext.SaveChangesAsync();

        }
        public async Task DeleteAsync(int id)
        {
            var manufacturer = _dataContext.Manufacturers.Find(id);
            _dataContext.Manufacturers.Remove(manufacturer);
            await _dataContext.SaveChangesAsync();
        }
    }
}
