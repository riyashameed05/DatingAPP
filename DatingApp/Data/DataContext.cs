using System;
using DatingApp.Model;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data;

public class DataContext : DbContext
{

    public DbSet<AppUser>? Users { get; set; }
    public DataContext(DbContextOptions options) : base(options)
    {
    }
}
