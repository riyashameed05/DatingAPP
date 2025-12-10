using System;
using System.Security.Cryptography;
using System.Text.Json;
using DatingApp.DTOs;
using DatingApp.Entities;
using DatingApp.Model;

namespace DatingApp.Data;

public class Seed
{
    public static async Task SeedUsersAsync(DataContext context)
    {
        if (context.Users.Any()) return;

        var memberData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var members = JsonSerializer.Deserialize<List<SeedUserDto>>(memberData);
        if (members == null) return;
        foreach (var member in members)
        {
            using var hmac = new HMACSHA512();
            var user = new AppUser()
            {
                Id = member.Id,
                UserName = member.DisplayName,
                Email = member.Email,
                ImageUrl = member.ImageUrl,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("Pa$$w0rd")),
                PasswordSalt = hmac.Key,
                Member = new Member()
                {
                    Id = member.Id,
                    Gender = member.Gender,
                    City = member.City,
                    ImageUrl = member.ImageUrl,
                    Country = member.Country,
                    Description = member.Description,
                    DateOfBirth = member.DateOfBirth,
                    Created = member.Created,
                    LastActive = member.LastActive,
                    DisplayName = member.DisplayName,
                }
            };

            user.Member.Photos.Add(new Photo
            {
                Url = member.ImageUrl!,
                MemberId = member.Id,
            });

            context.Users.Add(user);

            await context.SaveChangesAsync();

        }
    }
}
