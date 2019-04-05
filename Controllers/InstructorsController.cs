namespace AngularPresentation.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using AngularPresentation.Models;
    using Microsoft.AspNetCore.Http;

    [Route("api/[controller]")]
    public class InstructorsController : Controller
    {
        private static IList<Instructor> _instructors = new List<Instructor> {
            new Instructor { Id = 1, FirstName = "Adam", MiddleName = "V.", LastName = "Smith"}
        };

        [HttpGet()]
        public ActionResult<IEnumerable<Instructor>> Get()
        {
            return Ok(_instructors);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Instructor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Instructor> Get(int id)
        {
            if(!_instructors.Any(i => i.Id == id))
            {
                return NotFound();   
            }
            return Ok(_instructors.FirstOrDefault(i => i.Id == id));
        }

        [HttpPost]
        [ProducesResponseType(typeof(Instructor), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Instructor> Post([FromBody]Instructor instructor)
        {
            if(instructor == null 
                || instructor.Id != 0
                || _instructors.Any(i => i.Id == instructor.Id)
                || string.IsNullOrWhiteSpace(instructor.FirstName) || string.IsNullOrWhiteSpace(instructor.LastName))
            {
                return BadRequest();
            }

            var newInstructor = new Instructor {
                Id = _instructors.Any() ? _instructors.Max(i => i.Id) + 1 : 1,
                FirstName = instructor.FirstName,
                MiddleName = instructor.MiddleName,
                LastName = instructor.LastName 
            };
            _instructors.Add(newInstructor);

            return CreatedAtAction(nameof(Get), new {id = newInstructor.Id}, newInstructor);
        }

        [HttpPut]
        [ProducesResponseType(typeof(Instructor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult Put([FromBody]Instructor instructor)
        {
            if(instructor == null || instructor.Id <= 0
                || string.IsNullOrWhiteSpace(instructor.FirstName) || string.IsNullOrWhiteSpace(instructor.LastName))
            {
                return BadRequest();
            }
            var refInstructor = _instructors.FirstOrDefault(i => i.Id == instructor.Id);
            if(refInstructor != null)
            {
                int index = _instructors.IndexOf(refInstructor);
                _instructors.RemoveAt(index);
                _instructors.Insert(index,instructor);
            }

            return NoContent();
        }
        
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(Instructor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(int id)
        {
            var instructor = _instructors.FirstOrDefault(i => i.Id == id);
            if(instructor == null)
            {
                return BadRequest();
            }

            _instructors.Remove(instructor);

            return NoContent();
        }
    }
}