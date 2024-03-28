using AutoMapper;
using HMO.API.Models;
using HMO.Core.DTOs;
using HMO.Core.Entities;
using HMO.Core.Service;
using Microsoft.AspNetCore.Mvc;
using System;

namespace HMO.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController:ControllerBase
    {
        private readonly IMemberService _memberService;
        private readonly IMapper _mapper;
        public MemberController(IMemberService memberService, IMapper mapper)
        {
            _memberService = memberService;
            _mapper = mapper;
        }


        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> Get()
        {
            var list = await _memberService.GetAsync();
            var listDto = _mapper.Map<IEnumerable<MemberDTO>>(list);
            return Ok(listDto);
        }
        // GET: api/<ValuesController>
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> Get(int id)
        {
            var member = await _memberService.GetAsync(id);
            var memberDto = _mapper.Map<MemberDTO>(member);
            return Ok(memberDto);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<Member>> Post([FromBody] MemberPostModel m)
        {
            var memberToAdd = _mapper.Map<Member>(m);
            await _memberService.PostAsync(memberToAdd);
            var memberDto = _mapper.Map<MemberDTO>(memberToAdd);
            return Ok(memberDto);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] MemberPostModel m)
        {
            ActionResult<Member> existMember = await _memberService.GetAsync(id);

            if (existMember.Value is null)
            {
                return NotFound();
            }
            _mapper.Map(m, existMember.Value);

            await _memberService.PutAsync(id, existMember.Value);


            return Ok(_mapper.Map<MemberDTO>(existMember.Value));
        }

        //DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _memberService.DeleteAsync(id);
        }

    }
}
