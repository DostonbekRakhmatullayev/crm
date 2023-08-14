import { Controller } from '@nestjs/common';
import { SupperAdminServic } from './superAdmin.servic';

@Controller()
export class SupperAdminController {
  constructor(private readonly supperAdminServic: SupperAdminServic) {}
}
