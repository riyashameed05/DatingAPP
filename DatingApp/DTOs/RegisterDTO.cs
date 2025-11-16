using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.DTOs;

public class RegisterDTO
{
    [Required]
    public required string Username { get; set; }

    [Required]
    [MinLength(6)]
    public required string Password { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }
}
