import { SuperAdmin } from 'src/entities/superAdmin.entities';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import jwt from 'src/utils/jwt';
import { Admin } from 'src/entities/admin.entities';

@Injectable()
export class AdminServic {
  async findOne(req) {
    try {
      const { token } = req.headers;

      const { password, email } = jwt.verify(token);

      const user = await Admin.findOne({
        where: { password, email },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          images: true,
        },
      });

      return user;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async uploadImage(file, req) {
    try {
      const { first_name, last_name, email, password } = req.body;

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
          images: `/img/${file.filename}`,
        })
        .execute();

      const data = await Admin.findOne({
        where: { id },
      });

      const token = jwt.sign({ password: data.password, email: data.email });

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

      const token = jwt.sign({ password: user.password, email: user.email });

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

      const users = await Admin.findOne({
        where: {
          password: newTokenVerify.password,
          email: newTokenVerify.email,
        },
      });

      if (!users) {
        return {
          status: 404,
          message: 'Users is not found',
        };
      }

      const filename = file?.filename || users.images.split('/')[2];

      const data = await Admin.createQueryBuilder()
        .update(Admin)
        .set({
          first_name,
          email,
          last_name,
          password,
          images: `/img/${filename}`,
        })
        .where({ id: users.id })
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
}
