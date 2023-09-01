import { SuperAdmin } from 'src/entities/superAdmin.entities';
import { Injectable } from '@nestjs/common';
import jwt from 'src/utils/jwt';

@Injectable()
export class SuperAdminServic {
  async findOne(req) {
    const { token } = req.headers;

    const { password, email } = jwt.verify(token);

    const user = await SuperAdmin.findOne({
      where: { password, email },
    });

    return user;
  }

  async uploadImage(file, superAdmin) {
    try {
      const { first_name, last_name, email, password } = superAdmin.body;

      const {
        raw: [{ id }],
      } = await SuperAdmin.createQueryBuilder()
        .insert()
        .into(SuperAdmin)
        .values({
          first_name,
          last_name,
          email,
          password,
          images: `/img/${file.filename}`,
        })
        .execute();

      const data = await SuperAdmin.findOne({
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
      console.log(error);
    }
  }

  async adminLogin(req) {
    const { email, password } = req.body;

    const user = await SuperAdmin.findOne({
      where: { password, email },
    });

    const token = jwt.sign({ password: user.password, email: user.email });

    return {
      status: 201,
      message: 'Success',
      token: token,
    };
  }

  async putAdmin(req, file) {
    const { first_name, last_name, email, password } = req.body;

    const { token } = req.headers;
    if (!token) {
      return {
        status: 400,
        message: 'Token is not found',
      };
    }

    const newTokenVerify = jwt.verify(token);

    const users = await SuperAdmin.findOne({
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

    const data = await SuperAdmin.createQueryBuilder()
      .update(SuperAdmin)
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
  }
}
