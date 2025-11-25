using System;
using DatingApp.Entities;

namespace DatingApp.Model;

public class AppUser
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public required string UserName { get; set; }
    public required string Email { get; set; }

    public string? ImageUrl { get; set; }
    public required byte[] PasswordSalt { get; set; }
    public required byte[] PasswordHash { get; set; }

    public Member Member { get; set; } = null!;

}
