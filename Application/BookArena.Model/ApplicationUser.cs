﻿using System.ComponentModel.DataAnnotations;

namespace BookArena.Model
{
    public class ApplicationUser
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        public string Password { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "The {0} must be at most {1} characters long.")]
        public string Name { get; set; }

        [Required]
        [EmailAddress, MaxLength(50)]
        public string Email { get; set; }

        [StringLength(100, ErrorMessage = "The {0} must be at most {1} characters long.")]
        public string Address { get; set; }

        [Url]
        public string Website { get; set; }

        public string ImageFileName { get; set; }
    }
}