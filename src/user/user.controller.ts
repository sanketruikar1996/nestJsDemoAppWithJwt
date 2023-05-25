import { Body, Controller, Post } from '@nestjs/common';
import { UserModule } from './user.module';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signUp')
  signUp(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('mail') mail: string,
    @Body('password') password: string,
    @Body('phone') phone: string,
  ) {
    return this.userService.signUp(firstName, lastName, mail, password, phone);
  }

  @Post('/signIn')
  signIn(@Body('mail') mail: string, @Body('password') password: string) {
    return this.userService.signIn(mail, password);
  }
}
