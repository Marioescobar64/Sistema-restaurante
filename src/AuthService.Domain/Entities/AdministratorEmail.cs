using System.ComponentModel.DataAnnotations;

namespace AuthService.Domain.Entities;

public class AdministratorEmail
{
    [Key]
    [MaxLength(16)]
    public  string Id { get; set; } = string.Empty;

    [Required]
    [MaxLength(16)]
    public string AdministratorId { get; set; } = string.Empty;

    [Required]
    public bool EmailVerified { get; set; } = false;

    [MaxLength(256)]
    public string? EmailVerificationToken { get; set; }

    public DateTime? EmailVerificationTokenExpiry { get; set; }

    [Required]
    public Administrator Administrator { get; set; } = null!;
}