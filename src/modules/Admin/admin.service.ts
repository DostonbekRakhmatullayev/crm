import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import jwt from 'src/utils/jwt';
import { Admin } from 'src/entities/admin.entities';
import { response } from 'src/types/interfaces';

@Injectable()
export class AdminService {
  async findAllNoActive(req: any): Promise<response<Admin[] | null>> {
    try {
      const { token } = req.headers;

      const { role } = jwt.verify(token);

      if (role != 'superadmin') {
        return {
          status: 429,
          data: null,
          message: 'Siz superadmin emassiz',
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
        data: user,
        message: role == 'superadmin' ? 'Siz superadminsiz' : 'Siz subadminsiz',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async findAll(req: any): Promise<response<Admin[] | null>> {
    try {
      const { token } = req.headers;

      const { role } = jwt.verify(token);

      if (role != 'superadmin') {
        return {
          status: 429,
          data: null,
          message: 'Siz superadmin emassiz',
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
        data: user,
        message: role == 'superadmin' ? 'Siz superadminsiz' : 'Siz subadminsiz',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async findOne(req: any): Promise<response<Admin | null>> {
    try {
      const { token } = req.headers;

      const { id, role } = jwt.verify(token);

      const user = await Admin.findOneBy({ id });

      if (user) {
        return {
          status: 404,
          message: 'Admin topiladi',
          data: null,
        };
      }

      return {
        status: 201,
        message: role == 'superadmin' ? 'Siz superadminsiz' : 'Siz subadminsiz',
        data: user,
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async adminCreate(
    file: any,
    req: any,
  ): Promise<{
    status: number;
    token?: string;
    message: string;
    data?: null | Admin;
  }> {
    try {
      const { first_name, last_name, email, password } = req.body;

      const users = await Admin.findOneBy({
        email,
      });

      if (users) {
        return {
          status: 409,
          data: null,
          message: 'Bunday foydalanuvchi mavjud',
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
        id: data.id,
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

  async adminLogin(dto: any): Promise<{
    status: number;
    token?: string;
    message: string;
    data?: null | Admin;
  }> {
    try {
      const { email, password } = dto.body;

      const user = await Admin.findOne({
        where: { password, email },
      });

      const token = jwt.sign({
        password: user.password,
        email: user.email,
        role: user.role,
        id: user.id,
      });

      return {
        status: 201,
        message: 'Kirish muvaffaqiyatli yakunlandi',
        token: token,
      };  
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async adminUpdate(req: any, file: any): Promise<response<Admin | null>> {
    try {
      const { first_name, last_name, email, password } = req.body;

      const { token } = req.headers;
      if (!token) {
        return {
          status: 400,
          data: null,
          message: 'Token topilmadi',
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
          data: null,
          message: 'Token yaroqsiz',
        };
      }

      // if (email == user.email || password == user.password) {
      //   return {
      //     status: 409,
      //     data: null,
      //     message: 'Bunday foydalanuvchi mavjud',
      //   };
      // }

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
        data: data.raw,
        message: 'Success',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async adminDelete(req: any, param: any): Promise<response<Admin | null>> {
    try {
      const token = req?.headers?.token;

      const id = param?.id;
      const { email, password, role } = jwt.verify(token);

      if (role != 'subadmin') {
        return {
          status: 429,
          data: null,
          message: 'Siz superadmin emassiz ,sizga o`chirishga ruxsat yo`q',
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
          data: null,
          message: 'Bu adminni o`chirib bo`lmaydi',
        };
      }

      const deletedAdmin = await Admin.createQueryBuilder()
        .update(Admin)
        .set({
          isActive: 'noActive',
        })
        .where({ id })
        .returning(['*'])
        .execute();
      return {
        status: 200,
        data: deletedAdmin.raw,
        message: 'ok',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
