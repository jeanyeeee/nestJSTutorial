import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
//Creating the methods for UsersController 
@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Bob Smith",
            "email": "bob.smith@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 3,
            "name": "Charlie Davis",
            "email": "charlie.davis@example.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "David Brown",
            "email": "david.brown@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 5,
            "name": "Eve White",
            "email": "eve.white@example.com",
            "role": "ADMIN"
        },
        {
            "id": 6,
            "name": "Frank Green",
            "email": "frank.green@example.com",
            "role": "INTERN"
        },
        {
            "id": 7,
            "name": "Grace Lee",
            "email": "grace.lee@example.com",
            "role": "ENGINEER"
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) { //return if user has role
            const rolesArray = this.users.filter(user => user.role === role);
            if (!rolesArray.length) throw new NotFoundException("User role not found");
            return rolesArray
        }
        return this.users;
    }

    findOneUser(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new NotFoundException(`User ${id} does not exist`)
        return user;
    }

    createUser(user: CreateUserDto) {
        //should create an id automatically when using db
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id); //array sorted by highest id
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser);
        return newUser;
    }

    updateOneUser(id: number, 
        updatedUser: UpdateUserDto) {
                this.users = this.users.map(user => {
                    if (user.id === id) {
                        return {...user, ...updatedUser} //spread the existing users and the updated users
                    } 
                    return user; 
                })
                return this.findOneUser(id);
             }

    deleteOneUser(id:number) {
    const removedUser = this.findOneUser(id);
    this.users = this.users.filter(user => user.id !== id);
    return removedUser;
    }

}
