using AuthService.Application.Services;
using AuthService.Domain.Interfaces;
using AuthService.Domain.Entities;
using AuthService.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Persistence.Repositories;

public class AdministratorRepository(ApplicationDbContext context) : IAdministratorRepository
{
    //Forma en la que va a mostrar el usuario, con sus relaciones,
    //para que se pueda usar en el servicio de autenticación
    public async Task<Administrator> GetByIdAsync(string id)
    {
        //Incluye las relaciones necesarias para obtener toda la información del usuario
        var user = await context.Administrators
        .Include(u => u.AdministratorProfile)
        .Include(u => u.AdministratorEmail)
        .Include(u => u.AdministratorPasswordReset)
        .Include(u => u.AdministratorRoles)
        .FirstOrDefaultAsync(u => u.Id == id);

        return user ?? throw new InvalidOperationException($"Administrator with id {id} not found.");
    }


    //Obtiene un usuario por su email, incluyendo las relaciones necesarias para obtener toda la información del usuario
    public async Task<Administrator?> GetByEmailAsync(string email)
    {
        //Incluye las relaciones necesarias para obtener toda la información del usuario
        var user = await context.Administrators
        .Include(u => u.AdministratorProfile)
        .Include(u => u.AdministratorEmail)
        .Include(u => u.AdministratorPasswordReset)
        .Include(u => u.AdministratorRoles)
        .ThenInclude(ur => ur.Role)
        .FirstOrDefaultAsync(u => EF.Functions.ILike(u.Email, email));

        return user;

    }

    //Obtiene un usuario por su username, incluyendo las relaciones necesarias para obtener toda la información del usuario
    public async Task <Administrator?> GetByAdministratornameAsync(string username)
    {
        return await context.Administrators
        .Include(u => u.AdministratorProfile)
        .Include(u => u.AdministratorEmail)
        .Include(u => u.AdministratorPasswordReset)
        .Include(u => u.AdministratorRoles)
        .ThenInclude(ur => ur.Role)
        .FirstOrDefaultAsync(u => EF.Functions.ILike(u.Administratorname, username));

    }

    //Obtiene un usuario por su token de verificación de email, incluyendo las relaciones necesarias para obtener toda la información del usuario
    public async Task<Administrator?> GetByEmailVerificationTokenAsync(string token)
    {
        return await context.Administrators
        .Include(u => u.AdministratorProfile)
        .Include(u => u.AdministratorEmail)
        .Include(u => u.AdministratorPasswordReset)
        .Include(u => u.AdministratorRoles)
        .ThenInclude(ur => ur.Role)
        .FirstOrDefaultAsync(u => u.AdministratorEmail != null &&
                            u.AdministratorPasswordReset.PasswordResetToken == token);
    }

    public async Task<Administrator?> GetByPasswordResetTokenAsync(string token)
{
    return await context.Administrators
        .Include(u => u.AdministratorProfile)
        .Include(u => u.AdministratorEmail)
        .Include(u => u.AdministratorPasswordReset)
        .Include(u => u.AdministratorRoles)
        .ThenInclude(ur => ur.Role)
        .FirstOrDefaultAsync(u =>
            u.AdministratorPasswordReset != null &&
            u.AdministratorPasswordReset.PasswordResetToken == token);
}

    //Crea un nuevo usuario, guardando los cambios y luego obteniendo el usuario creado para devolverlo
    public async Task<Administrator> CreateAsync(Administrator user)
    {
        context.Administrators.Add(user);
        await context.SaveChangesAsync();
        return await GetByIdAsync(user.Id);
    }

    //Actualiza un usuario, guardando los cambios y luego obteniendo el usuario actualizado para devolverlo
    public async Task<Administrator> UpdateAsync(Administrator user)
    {
        await context.SaveChangesAsync();
        return await GetByIdAsync(user.Id);
    }

    //Elimina un usuario, primero obteniendo el usuario para asegurarse de que existe, luego eliminándolo y guardando los cambios
    public async Task<bool> DeleteAsync(string id)
    {
        var user = await GetByIdAsync(id);
        context.Administrators.Remove(user);
        await context.SaveChangesAsync();
        return true;
    }

    //Verifica si existe un usuario con el email o username dado, para evitar duplicados
    public async Task<bool> ExistsByEmailAsync(string email)
    {
        return await context.Administrators
            .AnyAsync(u => EF.Functions.ILike(u.Email, email));
    }

    public async Task<bool> ExistsByAdministratornameAsync(string username)
    {
        return await context.Administrators
            .AnyAsync(u => EF.Functions.ILike(u.Administratorname, username));
    }

    //Cambia el rol del usuario, eliminando los roles anteriores y asignando el nuevo rol
    public async Task UpdateAdministratorRoleAsync(string userId, string roleId)
    {
        var existingRoles = await context.AdministratorRoles
        .Where(ur => ur.AdministratorId == userId)
        .ToListAsync();

        context.AdministratorRoles.RemoveRange(existingRoles);

        var newAdministratorRole = new AdministratorRole
        {
            Id = UuidGenerator.GenerateAdministratorId(),
            AdministratorId = userId,
            RoleId = roleId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        context.AdministratorRoles.Add(newAdministratorRole);
        await context.SaveChangesAsync();
    }
}

