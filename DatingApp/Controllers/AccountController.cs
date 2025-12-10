using System;
using System.Security.Cryptography;
using System.Text;
using DatingApp.Data;
using DatingApp.DTOs;
using DatingApp.Interface;
using DatingApp.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controllers;


public class AccountController(DataContext dataContext, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDTO registerDTO)
    {
        if (await this.UserExists(registerDTO.DisplayName))
        {
            return BadRequest("User Already Registered");
        }

        if (await this.EmailExists(registerDTO.Email))
        {
            return BadRequest("Email Already Registered");
        }

        using var hmac = new HMACSHA512();
        var user = new AppUser
        {
            UserName = registerDTO.DisplayName,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
            PasswordSalt = hmac.Key,
            Email = registerDTO.Email,
        };
        dataContext.Users!.Add(user);
        await dataContext.SaveChangesAsync();
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.UserName,
            Token = tokenService.Createtoken(user),
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDTO loginDTO)
    {
        var user = await dataContext.Users!.SingleOrDefaultAsync(x => x.Email.ToLower() == loginDTO.Email.ToLower());
        if (user == null)
        {
            return Unauthorized("Invalid Email Address");
        }
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
            {
                return Unauthorized("Invalid Passwor");
            }
        }
        return new UserDto
        {   
            Id = user.Id,
            ImageUrl = user.ImageUrl,
            Email = user.Email,
            DisplayName = user.UserName,
            Token = tokenService.Createtoken(user),
        };
    }

    public async Task<bool> UserExists(string username)
    {
        return await dataContext.Users!.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
    }

    public async Task<bool> EmailExists(string email)
    {
        return await dataContext.Users!.AnyAsync(x => x.Email.ToLower() == email.ToLower());
    }

}
