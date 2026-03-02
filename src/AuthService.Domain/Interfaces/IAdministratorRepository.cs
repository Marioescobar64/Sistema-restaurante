using AuthService.Domain.Entities;

namespace AuthService.Domain.Interfaces;

public interface IAdministratorRepository
{
    //Metodos de Consulta
    Task<Administrator> CreateAsync(Administrator user);

    Task<Administrator> GetByIdAsync(string id);

    Task<Administrator?> GetByEmailAsync(string email);

    Task<Administrator?> GetByAdministratornameAsync(string username);

    Task<Administrator?> GetByEmailVerificationTokenAsync(string token);

    Task<Administrator?> GetByPasswordResetTokenAsync(string token);

    Task<bool> ExistsByEmailAsync(string email);

    Task<bool> ExistsByAdministratornameAsync(string username);

    Task<Administrator> UpdateAsync(Administrator user);

    Task<bool> DeleteAsync(string id);

    Task UpdateAdministratorRoleAsync(string userId, string roleId);
    
}