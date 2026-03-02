using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthService.Domain.Entities;

public class AdministratorProfile
{
    [Key]
    [MaxLength(16)]
    public string Id { get; set; } = string.Empty;

    [Required]
    [MaxLength(16)]
    [ForeignKey(nameof(Administrator))] // Llave foranea hacia la entidad Administrator
    public string AdministratorId { get; set; } = string.Empty;

    public string ProfilePictureUrl { get; set; } = null!;
    public string Bio { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; } 

    public Administrator Administrator { get; set; } = null!;
}


