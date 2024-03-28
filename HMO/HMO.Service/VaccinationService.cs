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
    public class VaccinationService:IVaccinationService
    {
        private readonly IVaccinationRepository _vaccinationRepository;
        public VaccinationService(IVaccinationRepository context1)
        {
            _vaccinationRepository = context1;
        }
        public Task<IEnumerable<Vaccination>> GetAsync()
        {
            return _vaccinationRepository.GetAsync();
        }

        public Task<Vaccination> GetAsync(int id)
        {
            return _vaccinationRepository.GetAsync(id);
        }

        public async Task<Vaccination> PostAsync(Vaccination v)
        {
            return await _vaccinationRepository.PostAsync(v);
        }

        public async Task PutAsync(int id, Vaccination v)
        {
            await _vaccinationRepository.PutAsync(id, v);
        }

        public async Task DeleteAsync(int id)
        {
            await _vaccinationRepository.DeleteAsync(id);
        }
    }
}
