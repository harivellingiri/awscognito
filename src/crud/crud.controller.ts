import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CrudService } from './crud.service';
import { User } from './user.dto';

@Controller('user')
export class CrudController {
  constructor(private readonly appService: CrudService) { }

  @Get('getuser')
  async getUser() {
    await this.appService.getUser();

  }

  @Post('create')
  async createUser(@Body() user: User) {
    await this.appService.createUser(user)

  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: User) {
    await this.appService.updateUser(id, user)

  }

  @Get('getuser/:id')
  async getSpecificUser(@Param('id') id: string) {
    await this.appService.getSpecficUser(id)

  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.appService.deleteUser(id)

  }

}
