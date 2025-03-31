using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Notes_Backend.Models;
using Notes_Backend.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace Notes_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NoteController : ControllerBase
    {
        private readonly DataContext _context;

        public NoteController(DataContext context)
        {
            _context = context;
        }

        public class NoteDto
        {
            public string description { get; set; }
            public string title { get; set; }

            public int userId { get; set; }
        }

        // GET: /note
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetAllNotes([FromQuery] int userId)
        {
            var userNotes = await _context.Notes.Where(note => note.userId == userId).ToListAsync();
            return userNotes;
        }

        // GET: /note/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNoteById(int id)
        {
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        // POST: /note
        [HttpPost]
        public async Task<ActionResult<Note>> CreateNote([FromBody] NoteDto noteDto)
        {
            var note = new Note
            {
                description = noteDto.description,
                title = noteDto.title,
                userId = noteDto.userId,
                createdAt = DateTime.UtcNow
            };

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNoteById), new { id = note.id }, note);
        }

        // DELETE: /note/:id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: /note/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(int id, [FromBody] NoteDto noteDto)
        {
            var note = await _context.Notes.AsNoTracking().FirstOrDefaultAsync(n => n.id == id);

            if (note == null)
            {
                return NotFound();
            }

            // Preserve the original createdAt value and ensure it is in UTC
            var originalCreatedAt = note.createdAt;
            if (originalCreatedAt.Kind == DateTimeKind.Unspecified)
            {
                originalCreatedAt = DateTime.SpecifyKind(originalCreatedAt, DateTimeKind.Utc);
            }
            else if (originalCreatedAt.Kind == DateTimeKind.Local)
            {
                originalCreatedAt = originalCreatedAt.ToUniversalTime();
            }

            // Update only the fields that are allowed to be modified
            note.description = noteDto.description;
            note.title = noteDto.title;
            note.userId = noteDto.userId;
            note.createdAt = originalCreatedAt; // Ensure createdAt remains unchanged

            _context.Entry(note).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Notes.Any(n => n.id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
    }
}
