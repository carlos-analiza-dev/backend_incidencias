import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('change-password')
  actualizarContrasena(@Body() updatePassword: UpdatePasswordDto) {
    return this.authService.actualizarContrasena(updatePassword);
  }

  @Get('/users')
  obtenerUsuarios(@Query() paginationDto: PaginationDto) {
    return this.authService.obtenerUsuarios(paginationDto);
  }

  @Get('/seacrh-users')
  searchUsers(@Query() paginationDto: PaginationDto) {
    return this.authService.searchUsers(paginationDto);
  }
}
