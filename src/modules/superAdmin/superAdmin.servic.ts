import { Injectable } from '@nestjs/common';
import { SuperAdmin } from 'src/entities/superAdmin.entities';
import jwt from 'src/utils/jwt';
// import { SuperAdmin } from '../../entities/superAdmin.entities';

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

  async putAdmin(req, file, Params) {
    const { first_name, last_name, email, password } = req.body;
    const { filename } = file;
    const { id } = Params;

    const data = await SuperAdmin.createQueryBuilder()
      .update(SuperAdmin)
      .set({
        first_name,
        email,
        last_name,
        password,
        images: `/img/${filename}`,
      })
      .where({ id })
      .execute();

    return {
      status: 200,
      message: 'Success',
    };
  }
}
