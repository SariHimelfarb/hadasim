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
    public class ManufacturerService:IManufacturerService
    {
        private readonly IManufacturerRepository _manufacturerRepository;
        public ManufacturerService(IManufacturerRepository context1)
        {
            _manufacturerRepository = context1;
        }
        public Task<IEnumerable<Manufacturer>> GetAsync()
        {
            return _manufacturerRepository.GetAsync();
        }

        public Task<Manufacturer> GetAsync(int id)
        {
            return _manufacturerRepository.GetAsync(id);
        }

        public async Task<Manufacturer> PostAsync(Manufacturer m)
        {
            return await _manufacturerRepository.PostAsync(m);
        }

        public async Task PutAsync(int id, Manufacturer m)
        {
            await _manufacturerRepository.PutAsync(id, m);
        }

        public async Task DeleteAsync(int id)
        {
            await _manufacturerRepository.DeleteAsync(id);
        }
    }
}
