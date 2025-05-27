import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserRole } from 'src/types/user.role.type';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @Matches(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    { message: 'El correo electronico no tiene formato adecuado' },
  )
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, {
    message:
      'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.',
  })
  password: string;

  @IsString()
  @Length(3, 100, { message: 'El nombre debe tener al menos 3 caracteres' })
  name: string;

  @IsString()
  @Length(5, 100, {
    message: 'La dirección debe tener entre 5 y 100 caracteres',
  })
  direccion: string;

  @IsString()
  @Matches(/^[0-9]{8,15}$/, {
    message: 'El teléfono debe contener entre 8 y 15 dígitos numéricos',
  })
  telefono: string;

  @IsString()
  @IsNotEmpty()
  identificacion: string;

  @IsUUID('4', { message: 'El ID del país debe ser un UUID válido' })
  pais: string;

  @IsUUID('4', { message: 'El ID de la sucursal debe ser un UUID válido' })
  sucursal: string;

  @IsUUID('4', { message: 'El ID del area debe ser un UUID válido' })
  area: string;

  @IsEnum(UserRole, { message: 'El campo rol debe ser un valor válido' })
  @IsOptional()
  rol?: UserRole;

  @IsOptional()
  @IsBoolean()
  IsActive?: boolean;

  @IsOptional()
  @IsBoolean()
  IsAuthorized?: boolean;
}
