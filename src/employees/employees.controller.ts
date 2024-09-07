import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EmployeesService } from './employees.service';


@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // Create a new employee
  @Post()
  create(@Body() createEmployee: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployee);
  }

  // Find all employees
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.employeesService.findAll(role);
  }

  // Fine one employee
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string,
   @Body() updateEmployee: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployee);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
