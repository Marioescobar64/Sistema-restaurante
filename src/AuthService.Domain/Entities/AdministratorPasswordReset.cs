using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthService.Domain.Entities;

public class AdministratorPasswordReset
{
    [Key]
    [MaxLength(16)]
    public string Id { get; set; } = null!;
 
    [Required]
    [MaxLength(16)]
    [ForeignKey(nameof(Administrator))] // Clave foránea que referencia a la entidad Administrator, indicando que cada restablecimiento de contraseña está asociado a un usuario específico.
    public string AdministratorId { get; set; } = string.Empty;
 
    [MaxLength(256)]
    public string? PasswordResetToken { get; set; } = null!;
 
    public DateTime? PasswordResetTokenExpiry { get; set; } = null!;
 
    [Required]
    public Administrator Administrator { get; set; } = null!;
}