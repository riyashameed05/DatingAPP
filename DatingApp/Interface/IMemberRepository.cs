using System;
using DatingApp.Data.Migrations;
using DatingApp.Entities;

namespace DatingApp.Interface;

public interface IMemberRepository
{
    void Update(Member member);

    Task<bool> SaveAllAsync();

    Task<Member?> GetMemberByIdAsync(string id);

    Task<IReadOnlyList<Member>> GetMembersAsync();

    Task<IReadOnlyList<Photo>> GetPhotosByMemberAsync(string memberId);

}
