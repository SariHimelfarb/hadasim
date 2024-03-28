using HMO.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Core.Repository
{
    public interface IManufacturerRepository
    {
        public Task<IEnumerable<Manufacturer>> GetAsync();
        public Task<Manufacturer> GetAsync(int id);
        public Task<Manufacturer> PostAsync(Manufacturer m);
        public Task PutAsync(int id, Manufacturer m);
        public Task DeleteAsync(int id);
    }
}
