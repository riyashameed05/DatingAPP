using System;

namespace DatingApp.DTOs;

public class UserDto
{
    public required int Id { get; set; }
    public required string Email { get; set; }
    public required string Username { get; set; }

    public required string Token { get; set; }

    public string? ImageUrl { get; set; }
}
