using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Notes_Backend.Models
{
    public class Note
    {
        public int id { get; set; }

        [Required]
        [MaxLength(100)]
        public string title { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        public int userId { get; set; }

        [Required]
        public DateTime createdAt { get; set; }
    }
}