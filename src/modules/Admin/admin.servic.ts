import { SuperAdmin } from 'src/entities/superAdmin.entities';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import jwt from 'src/utils/jwt';
import { Admin } from 'src/entities/admin.entities';
import { retry } from 'rxjs';

@Injectable()
export class AdminServic {
  async findAllNoActiv(req) {
    try {
      const { token } = req.headers;

      const { password, email, role } = jwt.verify(token);

      console.log(role);
      if (role != 'subadmin') {
        return {
          status: 429,
          message: 'Siz assosiy admin emassiz',
        };
      }

      const user = await Admin.find({
        where: {
          role: 'admin',
          isActive: 'noActive',
        },

        select: {
          id: true,
          first_name: true,
          last_name: true,
          images: true,
          email: true,
          password: true,
          createdAt: true,
          role: true,
        },
      });

      return {
        status: 201,
        message: role == 'subadmin' ? 'Siz Asosiy adminsiz' : 'Siz Adminsiz',
        data: user,
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async findAll(req) {
    try {
      const { token } = req.headers;

      const { password, email, role } = jwt.verify(token);

      console.log(role);
      if (role != 'subadmin') {
        return {
          status: 429,
          message: 'Siz assosiy admin emassiz',
        };
      }

      const user = await Admin.find({
        where: {
          role: 'admin',
          isActive: 'isActive',
        },

        select: {
          id: true,
          first_name: true,
          last_name: true,
          images: true,
          email: true,
          password: true,
          createdAt: true,
          role: true,
        },
      });

      return {
        status: 201,
        message: role == 'subadmin' ? 'Siz Asosiy adminsiz' : 'Siz Adminsiz',
        data: user,
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async findOne(req) {
    try {
      const { token } = req.headers;

      const { password, email, role } = jwt.verify(token);

      const user = await Admin.find({
        where: { email, password },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          images: true,
          email: true,
          password: true,
        },
      });
      console.log(user);
      console.log('assalom alaykum');

      console.log(role == 'subadmin' ? 'Siz Asosiy adminsiz' : 'Siz Adminsiz');

      // return user;
      return {
        status: 201,
        message: role == 'subadmin' ? 'Siz Asosiy adminsiz' : 'Siz Adminsiz',
        data: user,
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async adminCreate(file, req) {
    try {
      const { first_name, last_name, email, password } = req.body;

      const users = await Admin.findOne({
        where: {
          password,
        },
      });
      const userss = await Admin.findOne({
        where: {
          email,
        },
      });

      if (users || userss) {
        return {
          status: 409,
          message: 'There are such users',
        };
      }

      const {
        raw: [{ id }],
      } = await Admin.createQueryBuilder()
        .insert()
        .into(Admin)
        .values({
          first_name,
          last_name,
          email,
          password,
          images: `/${file.filename}`,
        })
        .execute();

      const data = await Admin.findOne({
        where: { id },
      });

      const token = jwt.sign({
        password: data.password,
        email: data.email,
        role: data.role,
      });

      if (id) {
        return {
          status: 201,
          message: 'Success',
          token: token,
        };
      }
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async adminLogin(req) {
    try {
      const { email, password } = req.body;

      const user = await Admin.findOne({
        where: { password, email },
      });

      const token = jwt.sign({
        password: user.password,
        email: user.email,
        role: user.role,
      });

      return {
        status: 201,
        message: 'Success',
        token: token,
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async putAdmin(req, file) {
    try {
      const { first_name, last_name, email, password } = req.body;

      const { token } = req.headers;
      if (!token) {
        return {
          status: 400,
          message: 'Token is not found',
        };
      }

      const newTokenVerify = jwt.verify(token);

      const user = await Admin.findOne({
        where: {
          password: newTokenVerify.password,
          email: newTokenVerify.email,
        },
      });

      if (!user) {
        return {
          status: 404,
          message: 'User is not found',
        };
      }

      if (email == user.email || password == user.password) {
        return {
          status: 409,
          message: 'There are such users',
        };
      }

      const filename = file?.filename || user.images.split('/')[1];

      const data = await Admin.createQueryBuilder()
        .update(Admin)
        .set({
          first_name,
          email,
          last_name,
          password,
          images: `/${filename}`,
        })
        .where({ id: user.id })
        .execute();

      return {
        status: 200,
        message: 'Success',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async adminDelete(req, param) {
    try {
      const token = req?.headers?.token;

      const id = param?.id;

      console.log(id);

      const { email, password, role } = jwt.verify(token);

      if (role != 'subadmin') {
        return {
          status: 429,
          message: 'Iz asosiy admin emassiz sizga delete qilishga ruxsat yuq',
        };
      }

      const data = await Admin.findOne({
        where: {
          id,
        },
      });

      if (data.role == 'subadmin') {
        return {
          status: 429,
          message: 'Bu admindi delete qilib bulmaydi',
        };
      }

      const aaa = await Admin.createQueryBuilder()
        .update(Admin)
        .set({
          isActive: 'noActive',
        })
        .where({ id })
        .returning(['*'])
        .execute();
      return {
        status: 200,
        message: 'ok',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
