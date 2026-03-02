using System.ComponentModel.DataAnnotations;

namespace AuthService.Domain.Entities;

public class Administrator
{
    [Key]
    [MaxLength(16)]
    public string Id { get; set;} = string.Empty;

    [Required(ErrorMessage = "El nombre es obligatorio")]
    [MaxLength(25)]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "El apellido es obligatorio")]
    [MaxLength(16)]
    public string Surname { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Administratorname { get; set; } = string.Empty;

    [Required]
    [EmailAddress]//El valor de esta propiedad debe tener un fomato de correo electrónico válido
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(255)]
    public string Password { get; set; } = string.Empty;

    public bool Status { get; set; } = false;

    [Required]
    public DateTime CreatedAt { get; set; }

    [Required]
    public DateTime UpdatedAt { get; set; }

    //Relaciones de navegacion solo dentro del codigo
    //Esto no altera la base de datos
    public AdministratorProfile AdministratorProfile { get; set; } = null!;
    public ICollection<AdministratorRole> AdministratorRoles { get; set; } = [];
    public AdministratorEmail AdministratorEmail { get; set; } = null!;
    public AdministratorPasswordReset AdministratorPasswordReset { get; set; } = null!;

}



