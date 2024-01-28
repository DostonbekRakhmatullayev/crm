import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Advance } from 'src/entities/advance.entities';
import { Daily } from 'src/entities/daily.entities';
import { Salary } from 'src/entities/salary.entities';
import { response } from 'src/types/interfaces';

@Injectable()
export class DailyService {
  async findAll(): Promise<response<Daily[]>> {
    try {
      const daily = await Daily.find();

      return {
        status: HttpStatus.OK,
        data: daily,
        message: 'Data successfully fetched',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async dailyCreate(body: any): Promise<response<Daily>> {
    try {
      let today = new Date();
      var newDay = String(new Date().getDate()).padStart(2, '0');
      var newMoon = String(today.getMonth() + 1).padStart(2, '0');
      var newYear = today.getFullYear();
      const newBody = await body;
      const daily = await Daily.find({ relations: { workers: true } });
      const salary = await Salary.find({ relations: { workers: true } });

      // const newDaily = await daily.filter(async (d) => {
      if (daily.length > 0) {
        for (const d of daily) {
          for (const b of newBody) {
            for (const s of salary) {
              if (s.workers.workers_id == b.workers) {
                if (d.workers.workers_id == b.workers) {
                  const day = String(d?.createdAt.getDate()).padStart(2, '0');
                  const moon = String(d?.createdAt.getMonth() + 1).padStart(
                    2,
                    '0',
                  );
                  const year = d?.createdAt.getFullYear();
                  if (day != newDay && newMoon != moon && newYear != year) {
                    console.log('ok');
                  } else {
                    return {
                      status: 400,
                      message:
                        'Bitta ishchiga bit kunda faqat birmatta oylik yoza olasiz faqat bulmasa mukofat puli berining ',
                    } as any;
                  }
                  // if (day != newDay && newMoon != moon && newYear != year) {
                  // } else {
                  //   return {
                  //     status: HttpStatus.CREATED,
                  //     message: 'Bu ishchiga bugun yolik yozildi ',
                  //   } as any;
                } else {
                  const { raw } = await Daily.createQueryBuilder()
                    .insert()
                    .into(Daily)
                    .values({
                      daily: s.salary_monthy,
                      isActive: b.isActive,
                      workers: b.workers,
                    })
                    .returning('*')
                    .execute();
                }
              } else {
                return {
                  status: 400,
                  message:
                    'Bu ishchiga kunlik oylik birik tirilmagan oldin bu ishchiga kunlik oylik birik tirining ',
                } as any;
              }
              // }
            }
          }
        }
      } else {
        for (const b of newBody) {
          for (const s of salary) {
            if (s.workers.workers_id == b.workers) {
              const { raw } = await Daily.createQueryBuilder()
                .insert()
                .into(Daily)
                .values({
                  daily: s.salary_monthy,
                  isActive: b.isActive,
                  workers: b.workers,
                })
                .returning('*')
                .execute();
            } else {
              return {
                status: 400,
                message:
                  'Bu ishchiga kunlik oylik birik tirilmagan oldin bu ishchiga kunlik oylik birik tirining ',
              } as any;
            }
            // }
            // }
          }
        }
      }
      // });

      // for (const d of daily) {
      //   for (const b of newBody) {
      //     for (const s of salary) {
      //       if (s.workers == b.workers) {
      //         const day = String(d?.createdAt.getDate()).padStart(2, '0');
      //         const moon = String(d?.createdAt.getMonth() + 1).padStart(2, '0');
      //         const year = d?.createdAt.getFullYear();
      //         if (d.workers == b.workers) {
      //           if (day != newDay && newMoon != moon && newYear != year) {
      //           } else {
      //             return {
      //               status: HttpStatus.CREATED,

      //               message: 'Bu ishchiga bugun yolik yozildi ',
      //             } as any;
      //           }
      //         } else {
      //           const { raw } = await Daily.createQueryBuilder()
      //             .insert()
      //             .into(Daily)
      //             .values({ daily: s.salary_monthy, isActive: b.isActive })
      //             .returning('*')
      //             .execute();
      //         }
      //       }
      //     }
      //   }
      // }

      return {
        status: 200,
        message: 'successfully',
      } as any;
      // return newDaily as any;

      // return {
      //   status: HttpStatus.CREATED,
      //   // data: raw,
      //   message: 'Daily wages successfully created',
      // } as any;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async dailyUpdate(param: any, body: any): Promise<response<Daily>> {
    try {
      const { advance, advance_name } = body;

      const { id } = param;

      const { raw } = await Daily.createQueryBuilder()
        .update(Daily)
        .set({})
        .where({ advance_id: id })
        .returning('*')
        .execute();

      return {
        status: 200,
        data: raw,
        message: 'Daily wage successfully updated',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async dailyDelete(param: any): Promise<response<Daily>> {
    try {
      const { id } = param;

      const { raw } = await Daily.createQueryBuilder()
        .softDelete()
        .from(Daily)
        .where({ advance_id: id })
        .returning('*')
        .execute();

      return {
        status: 200,
        data: raw,
        message: 'Daily wage successfully deleted',
      };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
