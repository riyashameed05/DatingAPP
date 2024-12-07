using System;
using DatingApp.Model;

namespace DatingApp.Interface;

public interface ITokenService
{
    public string Createtoken(AppUser user);
}
