export class Usuario {
    _id!: string;
    username!: string;
    password!: string;
    NombreApellido!: string;
    rol!: string;
    dni!: string;

    constructor(id:string="", username:string="", password:string="", nombreApellido:string="",
rol:string="", dni:string=""){
this._id = id;
this.username = username;
this.password = password;
this.NombreApellido = nombreApellido;
this.rol = rol;
this.dni = dni
}
}
