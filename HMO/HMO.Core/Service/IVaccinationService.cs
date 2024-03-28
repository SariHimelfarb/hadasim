using HMO.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Core.Service
{
    public interface IVaccinationService
    {
        public Task<IEnumerable<Vaccination>> GetAsync();
        public Task<Vaccination> GetAsync(int id);
        public Task<Vaccination> PostAsync(Vaccination v);
        public Task PutAsync(int id, Vaccination v);
        public Task DeleteAsync(int id);
    }
}
