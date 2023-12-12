using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Diagnostics;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskListController : ControllerBase
    {
        private readonly ProjectContext _context;

        public TaskListController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/TaskList/{userId}
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<ICollection<TaskList>>> GetUserTaskList(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);
            return user == null ? NotFound() : Ok(user.TaskLists);
        }

        // GET: api/TaskList/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskList>> GetTaskList(int id)
        {
            var taskList = await _context.TaskList.FindAsync(id);
            return taskList == null ? NotFound() : taskList;
        }

        // PUT: api/User/{userId}/TaskList/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskList(int id, TaskList taskList)
        {
            // Lookup entity in the DB
            var taskListInDb = await _context.TaskList.FirstOrDefaultAsync(task => task.Id == taskList.Id);
            if (id != taskList.Id || taskListInDb == null)
            {
                return BadRequest();
            }

            // Track changes of entity and update parent properties
            _context.Entry(taskListInDb).CurrentValues.SetValues(taskList);
            // Updates child items if request.childId == entityInDb.childId, otherwise removes child items from entityInDb
            var todoList = taskListInDb.TodoTasks.ToList();
            foreach (var todos in todoList)
            {
                var mTodos = taskList.TodoTasks.SingleOrDefault(todo => todo.Id == todos.Id);
                if (mTodos != null) _context.Entry(todos).CurrentValues.SetValues(mTodos);
                else _context.Remove(todos);
            }

            // Adds child items if request.childId does not exists yet in the entityInDb
            foreach(var todo in taskList.TodoTasks)
            {
                if (todoList.All(i => i.Id != todo.Id)) taskListInDb.TodoTasks.Add(todo);
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/TaskList
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{userId}")]
        public async Task<ActionResult<TaskList>> PostTaskList(int userId, TaskList taskList)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);
            if(user == null) return NotFound();
            user.TaskLists.Add(taskList);
            _context.TaskList.Add(taskList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskList", new { id = taskList.Id }, taskList);
        }

        // DELETE: api/TaskList/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskList(int id)
        {
            var taskList = await _context.TaskList.FindAsync(id);
            if (taskList == null) return NotFound();

            var todos = _context.TodoTasks.Where(todo => taskList.TodoTasks.Contains(todo));

            _context.TodoTasks.RemoveRange(todos);
            _context.TaskList.Remove(taskList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskListExists(int id)
        {
            return _context.TaskList.Any(e => e.Id == id);
        }
    }
}
