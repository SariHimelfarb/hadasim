using AutoMapper;
using HMO.API.Models;
using HMO.Core.DTOs;
using HMO.Core.Entities;
using HMO.Core.Service;
using Microsoft.AspNetCore.Mvc;

namespace HMO.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VaccinationController:ControllerBase
    {
        private readonly IVaccinationService _vaccinationService;
        private readonly IMapper _mapper;
        public VaccinationController(IVaccinationService vaccinationService, IMapper mapper)
        {
            _vaccinationService = vaccinationService;
            _mapper = mapper;
        }


        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vaccination>>> Get()
        {
            var list = await _vaccinationService.GetAsync();
            var listDto = _mapper.Map<IEnumerable<VaccinationDTO>>(list);
            return Ok(listDto);
        }
        // GET: api/<ValuesController>
        [HttpGet("{id}")]
        public async Task<ActionResult<Vaccination>> Get(int id)
        {
            var vaccination = await _vaccinationService.GetAsync(id);
            var vaccinationDto = _mapper.Map<VaccinationDTO>(vaccination);
            return Ok(vaccinationDto);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<Vaccination>> Post([FromBody] VaccinationPostModel v)
        {
            var vaccinationToAdd = _mapper.Map<Vaccination>(v);
            await _vaccinationService.PostAsync(vaccinationToAdd);
            var vaccinationDto = _mapper.Map<VaccinationDTO>(vaccinationToAdd);
            return Ok(vaccinationDto);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] VaccinationPostModel v)
        {
            Vaccination existingVaccination = await _vaccinationService.GetAsync(id);

            if (existingVaccination == null)
            {
                return NotFound();
            }

            // Map the properties from VaccinationPostModel to existingVaccination
            _mapper.Map(v, existingVaccination);

            await _vaccinationService.PutAsync(id, existingVaccination);

            return Ok(_mapper.Map<VaccinationDTO>(existingVaccination));
        }

        //DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _vaccinationService.DeleteAsync(id);
        }
    }
}
