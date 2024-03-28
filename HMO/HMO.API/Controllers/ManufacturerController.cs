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
    public class ManufacturerController: ControllerBase
    {
        private readonly IManufacturerService _manufacturerService;
        private readonly IMapper _mapper;
        public ManufacturerController(IManufacturerService manufacturerService, IMapper mapper)
        {
            _manufacturerService = manufacturerService;
            _mapper = mapper;
        }


        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Manufacturer>>> Get()
        {
            var list = await _manufacturerService.GetAsync();
            var listDto = _mapper.Map<IEnumerable<ManufacturerDTO>>(list);
            return Ok(listDto);
        }
        // GET: api/<ValuesController>
        [HttpGet("{id}")]
        public async Task<ActionResult<Manufacturer>> Get(int id)
        {
            var manufacturer = await _manufacturerService.GetAsync(id);
            var manufacturerDto = _mapper.Map<ManufacturerDTO>(manufacturer);
            return Ok(manufacturerDto);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<Manufacturer>> Post([FromBody] ManufacturerPostModel m)
        {
            var manufacturerToAdd = _mapper.Map<Manufacturer>(m); // Use the mapping configuration from APIMappingProfile
            await _manufacturerService.PostAsync(manufacturerToAdd);
            var manufacturerDto = _mapper.Map<ManufacturerDTO>(manufacturerToAdd);
            return Ok(manufacturerDto);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ManufacturerPostModel m)
        {
            ActionResult<Manufacturer> existManufacturer = await _manufacturerService.GetAsync(id);

            if (existManufacturer.Value is null)
            {
                return NotFound();
            }
            _mapper.Map(m, existManufacturer.Value);

            await _manufacturerService.PutAsync(id, existManufacturer.Value);


            return Ok(_mapper.Map<ManufacturerDTO>(existManufacturer.Value));
        }

        //DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _manufacturerService.DeleteAsync(id);
        }
    }
}
